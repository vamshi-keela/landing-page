import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Z_INDEX } from "../../utils/constants";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    style={{ zIndex: Z_INDEX.modal || 1000 }}
                    className="fixed inset-0 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl glass-panel cinematic-shadow overflow-hidden rounded-lg border border-white/10 flex flex-col md:flex-row"
                    >
                        {/* Visual Accent Side */}
                        <div className="hidden md:block w-1/3 relative overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqLo8NKyI71kSGfbJNhSePbpGMsATik2iuSogqIcvjGtRA0C8POW057UHj9M0-sW7c9Yz2BM2KHzdK2DEMdR3T7NInOoJHAvdXuOS9FOZKh7Dc7DUIHY7VC3HRRE3QZUlgZRdEmCHShRwCt9zgtMK2PzUDevyhIUBo2u6lgNrD5ZoEhN4yunm2DDE5Xc1FZW_fKLgeHm-v0D2EDMSv6rORzlMBROYpXgD0Ojpa3m9VPv5g9P0BBoxNWrP_dt_21Ao5-MN2UfFDW8Q"
                                alt="Burning film reel"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#131313]/90" />
                            <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                                <span className="font-mono text-[10px] tracking-[0.2em] text-primary-container uppercase">Alpha Access</span>
                                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">v0.9.4.2</span>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="flex-1 p-8 sm:p-12 relative flex flex-col justify-center">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-white/40 hover:text-primary-container transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="mb-10">
                                <h2 className="font-headline font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-white mb-4 uppercase">
                                    THE FUTURE OF FILMMAKING IS <span className="text-primary-container">ALMOST HERE.</span>
                                </h2>
                                <p className="text-white/60 font-sans text-sm sm:text-base leading-relaxed max-w-md">
                                    Join the elite circle of creators and production houses defining the new era of generative cinema. Limited early access slots available.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="relative">
                                    <label className="block font-headline text-[10px] tracking-[0.15em] text-white/40 uppercase mb-2">Production Email</label>
                                    <div className="relative group">
                                        <input
                                            className="w-full bg-black/40 text-white font-mono text-sm p-4 rounded-lg border-none focus:ring-1 focus:ring-primary-container/50 placeholder:text-white/10 uppercase tracking-widest transition-all outline-none"
                                            placeholder="DIRECTOR@STUDIO.COM"
                                            type="email"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-primary-container transition-all" />
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-primary-container text-on-primary-container font-headline font-bold text-xs tracking-[0.2em] py-5 rounded-lg uppercase shadow-xl shadow-primary-container/40 transition-all"
                                >
                                    JOIN THE A-LIST
                                </motion.button>

                                <div className="flex items-center gap-3 pt-2">
                                    <span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse" />
                                    <p className="font-mono text-[10px] tracking-wider text-white/40 uppercase">
                                        482 PRODUCERS IN QUEUE
                                    </p>
                                </div>
                            </div>

                            <p className="mt-12 font-mono text-[9px] tracking-widest text-white/20 uppercase">
                                By joining, you agree to our <a className="text-white/40 hover:text-primary-container underline underline-offset-4 decoration-white/10" href="#">Terms of Service</a> & <a className="text-white/40 hover:text-primary-container underline underline-offset-4 decoration-white/10" href="#">Privacy Policy</a>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
