import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PWAInstallPrompt = () => {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if already installed or in standalone mode
        const checkStandalone = () => {
            return window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone === true;
        };

        setIsStandalone(checkStandalone());

        // Check if it's iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);

        const handleBeforeInstallPrompt = (e) => {
            // Prevent the default browser mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setInstallPrompt(e);

            // Only show if not already in standalone mode
            if (!checkStandalone()) {
                // Delay showing to not annoy user immediately
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 5000);
                return () => clearTimeout(timer);
            }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // For iOS, show the prompt manually as they don't support beforeinstallprompt
        if (isIOSDevice && !checkStandalone()) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 8000); // Wait a bit longer for iOS
            return () => clearTimeout(timer);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) return;

        // Show the native install prompt
        installPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await installPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the PWA install');
        }

        setInstallPrompt(null);
        setIsVisible(false);
    };

    if (!isVisible || isStandalone) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-md"
            >
                <div className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                    <div className="bg-[#050508]/95 backdrop-blur-2xl rounded-[14px] p-5 border border-white/10">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/40" />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-50 animate-pulse" />
                                <Download className="w-7 h-7 text-white relative z-10" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-orbitron font-bold text-lg tracking-tight uppercase">Install GameHub</h3>
                                <p className="text-gray-400 font-rajdhani text-sm leading-tight mt-0.5">Experience zero-lag gaming directly from your home screen.</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            {isIOS ? (
                                <div className="flex flex-col gap-3 p-3.5 bg-white/5 rounded-xl border border-white/10 animate-pulse-slow">
                                    <p className="text-xs text-blue-300/80 font-medium flex items-center gap-2">
                                        <Share className="w-4 h-4" /> IOS INSTALL PROTOCOL:
                                    </p>
                                    <p className="text-[13px] text-gray-300 font-rajdhani">
                                        Tap the <span className="text-white font-bold">Share</span> icon below and select <span className="text-white font-bold">'Add to Home Screen'</span>.
                                    </p>
                                </div>
                            ) : (
                                <button
                                    onClick={handleInstallClick}
                                    className="w-full py-3.5 bg-white text-[#050508] font-orbitron font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.1)] active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Download Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PWAInstallPrompt;
