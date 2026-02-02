
"use client"

import { useEffect, useState } from "react"
import { saveSubscriptionAction } from "@/actions"
import { Bell, BellOff } from "lucide-react"

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false)
    const [subscription, setSubscription] = useState<PushSubscription | null>(null)
    const [headerKey, setHeaderKey] = useState<string | null>(null)

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true)
            registerServiceWorker()

            setHeaderKey(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "BOvYPQrB3IXuIyqqn1YCP5uual0hfqS3JiBTMtWNFmSrXXxJ7br7T8LcrbQAbmaYgtcuKwXd963bTuec6vzSyEg")
        }
    }, [])

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
        })
        const sub = await registration.pushManager.getSubscription()
        setSubscription(sub)
    }

    async function subscribeToPush() {
        if (!headerKey) return
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(headerKey),
        })
        setSubscription(sub)
        // Save to DB
        await saveSubscriptionAction(JSON.parse(JSON.stringify(sub)))
        alert("Notifications enabled!")
    }

    function urlBase64ToUint8Array(base64String: string) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4)
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/')

        const rawData = window.atob(base64)
        const outputArray = new Uint8Array(rawData.length)

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i)
        }
        return outputArray
    }

    if (!isSupported) return null

    return (
        <div className="mr-2">
            {!subscription ? (
                <button
                    onClick={subscribeToPush}
                    className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-slate-100"
                    title="Enable Notifications"
                >
                    <BellOff size={18} />
                </button>
            ) : (
                <div className="p-2 text-blue-600 bg-blue-50 rounded-full" title="Notifications Enabled">
                    <Bell size={18} />
                </div>
            )}
        </div>
    )
}
