import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, CheckCircle, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";
// import { Z_INDEX } from "../../utils/constants";

// ── Form field components ─────────────────────────────────────

interface TextFieldProps {
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}

function TextField({ label, placeholder, type = "text", value, onChange, disabled }: TextFieldProps) {
    return (
        <div className="relative">
            <label className="block font-headline text-[10px] tracking-[0.15em] text-white/40 mb-2 uppercase">
                {label}
            </label>
            <div className="relative group">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="w-full bg-black/40 text-white font-mono text-sm p-4 rounded-lg border-none focus:ring-1 focus:ring-primary-container/50 placeholder:text-white/10 tracking-widest transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                    placeholder={placeholder}
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-primary-container transition-all" />
            </div>
        </div>
    );
}

interface SelectFieldProps {
    label: string;
    placeholder: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}

function SelectField({ label, placeholder, options, value, onChange, disabled }: SelectFieldProps) {
    return (
        <div className="relative">
            <label className="block font-headline text-[10px] tracking-[0.15em] text-white/40 mb-2 uppercase">
                {label}
            </label>
            <div className="relative group">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    className="w-full appearance-none bg-black/40 text-white font-mono text-sm p-4 rounded-lg border-none focus:ring-1 focus:ring-primary-container/50 tracking-widest transition-all outline-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ color: value === "" ? "rgba(255,255,255,0.1)" : undefined }}
                >
                    <option value="" disabled hidden style={{ color: "rgba(255,255,255,0.1)" }}>
                        {placeholder}
                    </option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value} className="bg-[#131313] text-white">
                            {o.label}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40"
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-focus-within:bg-primary-container transition-all" />
            </div>
        </div>
    );
}

// ── Success screen ────────────────────────────────────────────

function SuccessScreen({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center gap-6 py-8 px-2"
        >
            <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
            >
                <CheckCircle size={52} className="text-primary-container" strokeWidth={1.5} />
            </motion.div>

            <div>
                <h3 className="font-headline font-bold text-2xl sm:text-3xl uppercase text-white leading-tight mb-3">
                    YOU'RE ON THE<br />
                    <span className="text-primary-container">A-LIST.</span>
                </h3>
                <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xs mx-auto">
                    We'll reach out when your beta slot opens. The future of filmmaking is closer than you think.
                </p>
            </div>


            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="mt-2 font-mono text-[10px] tracking-[0.2em] text-white/30 hover:text-primary-container uppercase transition-colors cursor-pointer"
            >
                Close
            </motion.button>
        </motion.div>
    );
}

// ── Modal ─────────────────────────────────────────────────────

const ROLE_OPTIONS = [
    { value: "indie_creator", label: "Indie Creator" },
    { value: "filmmaker", label: "Filmmaker" },
    { value: "enterprise", label: "Business Enterprise" },
];

const API_URL = "https://screenplay-backend.getinduce.com/public/waitlist/beta";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    if (typeof document === "undefined") return null;

    function resetForm() {
        setName(""); setEmail(""); setRole("");
        setErrors([]); setSuccess(false);
    }

    function handleClose() {
        onClose();
        // brief delay so reset doesn't flash during exit animation
        setTimeout(resetForm, 300);
    }

    async function handleSubmit() {
        setErrors([]);

        if (!name.trim() || !email.trim() || !role) {
            setErrors(["Please fill in all fields."]);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim(),
                    segment: role,
                    company: "",
                    websiteUrl: "",   // honeypot — must always be empty
                }),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json().catch(() => ({}));
                const msgs: string[] = Array.isArray(data.message)
                    ? data.message
                    : [data.message ?? "Something went wrong. Please try again."];
                setErrors(msgs);
            }
        } catch {
            setErrors(["Network error. Please check your connection and try again."]);
        } finally {
            setLoading(false);
        }
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    // style={{ zIndex: Z_INDEX.modal || 1000 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl glass-panel cinematic-shadow rounded-lg border border-white/10 flex flex-col md:flex-row overflow-hidden"
                        style={{ maxHeight: "90vh" }}
                    >
                        {/* Image side — fixed, non-scrolling */}
                        <div className="hidden md:flex md:w-2/5 relative flex-shrink-0 overflow-hidden">
                            <img
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqLo8NKyI71kSGfbJNhSePbpGMsATik2iuSogqIcvjGtRA0C8POW057UHj9M0-sW7c9Yz2BM2KHzdK2DEMdR3T7NInOoJHAvdXuOS9FOZKh7Dc7DUIHY7VC3HRRE3QZUlgZRdEmCHShRwCt9zgtMK2PzUDevyhIUBo2u6lgNrD5ZoEhN4yunm2DDE5Xc1FZW_fKLgeHm-v0D2EDMSv6rORzlMBROYpXgD0Ojpa3m9VPv5g9P0BBoxNWrP_dt_21Ao5-MN2UfFDW8Q"
                                alt="Burning film reel"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#131313]/90" />
                            <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                                <span className="font-mono text-[10px] tracking-[0.2em] text-primary-container uppercase">Beta Access</span>
                                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">v1.0</span>
                            </div>
                        </div>

                        {/* Content side — scrollable */}
                        <div className="flex-1 overflow-y-auto flex flex-col relative">
                            <div className="p-8 sm:p-10 flex flex-col gap-6">
                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-5 right-5 text-white/40 hover:text-primary-container transition-colors cursor-pointer"
                                >
                                    <X size={22} />
                                </button>

                                <AnimatePresence mode="wait">
                                    {success ? (
                                        <SuccessScreen key="success" onClose={handleClose} />
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col gap-6"
                                        >
                                            {/* Heading */}
                                            <div>
                                                <h2 className="font-headline font-bold text-2xl sm:text-3xl leading-tight tracking-tight text-white mb-3 uppercase">
                                                    THE FUTURE OF FILMMAKING IS{" "}
                                                    <span className="text-primary-container">HERE.</span>
                                                </h2>
                                                <p className="text-white/60 font-sans text-sm leading-relaxed">
                                                    Join the elite circle of creators and production houses defining the new era of generative cinema. Limited early access slots available.
                                                </p>
                                            </div>

                                            {/* Form fields */}
                                            <div className="space-y-5">
                                                <TextField
                                                    label="Full Name"
                                                    placeholder="FULL NAME"
                                                    value={name}
                                                    onChange={setName}
                                                    disabled={loading}
                                                />
                                                <TextField
                                                    label="Production Email"
                                                    placeholder="DIRECTOR@STUDIO.COM"
                                                    type="email"
                                                    value={email}
                                                    onChange={setEmail}
                                                    disabled={loading}
                                                />
                                                <SelectField
                                                    label="Primary Role"
                                                    placeholder="SELECT YOUR ROLE"
                                                    options={ROLE_OPTIONS}
                                                    value={role}
                                                    onChange={setRole}
                                                    disabled={loading}
                                                />
                                            </div>

                                            {/* Inline errors */}
                                            <AnimatePresence>
                                                {errors.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -6 }}
                                                        className="flex flex-col gap-1"
                                                    >
                                                        {errors.map((err, i) => (
                                                            <p key={i} className="font-mono text-[10px] tracking-wider text-red-400/80 uppercase">
                                                                — {err}
                                                            </p>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* CTA */}
                                            <motion.button
                                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className="w-full bg-primary-container text-on-primary-container font-headline font-bold text-xs tracking-[0.2em] py-5 rounded-lg uppercase shadow-xl shadow-primary-container/40 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                            >
                                                {loading && <Loader2 size={15} className="animate-spin" />}
                                                {loading ? "SECURING YOUR SLOT..." : "JOIN THE A-LIST"}
                                            </motion.button>


                                            {/* Legal */}
                                            <p className="font-mono text-[9px] tracking-widest text-white/20 uppercase">
                                                By joining, you agree to our{" "}
                                                <a className="text-white/40 hover:text-primary-container underline underline-offset-4 decoration-white/10" href="https://getinduce.com/termsofservice.html">
                                                    Terms of Service
                                                </a>{" "}
                                                &{" "}
                                                <a className="text-white/40 hover:text-primary-container underline underline-offset-4 decoration-white/10" href="https://getinduce.com/privacy-policy.html">
                                                    Privacy Policy
                                                </a>
                                                .
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
