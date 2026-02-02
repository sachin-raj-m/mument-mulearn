"use client"

import { useEffect, useState } from "react"
import { usePushSubscription } from "@/hooks/usePushSubscription"
import { Download, Bell, X } from "lucide-react"

import { useToast } from "@/components/ToastProvider"

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showPrompt, setShowPrompt] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hasJustSubscribed, setHasJustSubscribed] = useState(false)
    const { isSupported, subscription, subscribeToPush } = usePushSubscription()
    const { show } = useToast()

    const [isDismissed, setIsDismissed] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
        const checkStandalone = () => {
            const matches = window.matchMedia('(display-mode: standalone)').matches
            setIsStandalone(matches)
        }
        checkStandalone()
        window.matchMedia('(display-mode: standalone)').addEventListener('change', checkStandalone)

        if (typeof window !== 'undefined') {
            const dismissed = localStorage.getItem('install_prompt_dismissed')
            if (dismissed) setIsDismissed(true)
        }

        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handler)
        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
            window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkStandalone)
        }
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
            setDeferredPrompt(null)
            setShowPrompt(false)
        }
    }

    const handleSubscribe = async () => {
        setIsLoading(true)
        try {
            const success = await subscribeToPush()
            if (success) {
                show({ title: "Success", description: "Notifications enabled!" })
                setHasJustSubscribed(true)
            } else {
                show({ title: "Error", description: "Could not enable notifications. Check permissions." })
            }
        } catch (error) {
            console.error(error)
            show({ title: "Error", description: "An unexpected error occurred." })
        } finally {
            setIsLoading(false)
        }
    }



    const handleDismissForever = () => {
        setIsDismissed(true)
        localStorage.setItem('install_prompt_dismissed', 'true')
        setShowPrompt(false)
    }

    if (isStandalone || isDismissed) return null

    if (isStandalone || isDismissed) return null

    const showNotify = isSupported && !subscription
    const showInstall = !showNotify && showPrompt && deferredPrompt
    // Fallback if system prompt missing but we are clear to show manual
    const showManual = !showNotify && !showInstall && subscription && !isStandalone

    if (!showNotify && !showInstall && !showManual) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800">
                    {showInstall ? "Install App" : showManual ? "Install App" : "Enable Icons & Updates"}
                </h3>
                <button onClick={() => setShowPrompt(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={18} />
                </button>
            </div>

            <p className="text-sm text-slate-500 mb-4">
                {showInstall
                    ? "Install Mument for the best experience and quick access."
                    : showManual
                        ? "Tap your browser menu and select 'Add to Home Screen' to install."
                        : "Enable notifications to stay updated on your feedback."}
            </p>

            <div className="flex gap-2">
                {showInstall && (
                    <button
                        onClick={handleInstall}
                        className="flex-1 bg-brand-blue text-white py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <Download size={16} /> Install
                    </button>
                )}

                {showNotify && (
                    <button
                        onClick={handleSubscribe}
                        disabled={isLoading}
                        className={`flex-1 ${!showInstall ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-700'} py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <Bell size={16} />
                        {isLoading ? "Enabling..." : "Enable Updates"}
                    </button>
                )}

                {showManual && (
                    <button
                        onClick={handleDismissForever}
                        className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                    >
                        Don't show again
                    </button>
                )}
            </div>
        </div>
    )
}
