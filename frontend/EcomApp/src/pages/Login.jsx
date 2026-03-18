import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: decorative panel ── */}
            <div className="hidden lg:flex flex-col justify-between bg-dark p-16 relative overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80&auto=format&fit=crop"
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
                </div>

                {/* Decorative number */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[14rem] font-light text-white/5 leading-none select-none pointer-events-none tracking-tighter">
                    01
                </div>

                {/* Logo */}
                <div className="relative z-10">
                    <Link to="/" className="font-serif text-3xl font-light tracking-[0.25em] text-white">
                        ORM<span className="text-accent">A</span>N
                    </Link>
                </div>

                {/* Quote */}
                <div className="relative z-10">
                    <p className="font-serif text-[clamp(1.8rem,2.5vw,2.4rem)] font-light leading-[1.3] text-white mb-6">
                        "Her parça, evinize<br />
                        <em className="italic text-sand">ömür boyu sürecek</em><br />
                        bir hikaye ekler."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-[1px] bg-accent"></div>
                        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-sand/70">Orman Mobilya, 2026</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="relative z-10 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                    {[
                        { number: '200+', label: 'Tasarım' },
                        { number: '40+', label: 'Zanaatkar' },
                        { number: '15', label: 'Yıl' },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="font-serif text-2xl font-light text-white">{s.number}</p>
                            <p className="text-[0.65rem] tracking-[0.15em] uppercase text-sand/60 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Right: form panel ── */}
            <div className="flex flex-col justify-center px-8 py-20 sm:px-16 lg:px-20">

                {/* Mobile logo */}
                <div className="lg:hidden mb-12">
                    <Link to="/" className="font-serif text-3xl font-light tracking-[0.25em] text-dark">
                        ORM<span className="text-accent">A</span>N
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="max-w-sm w-full mx-auto lg:mx-0"
                >
                    {/* Header */}
                    <p className="flex items-center gap-3 text-[0.65rem] tracking-[0.2em] uppercase text-accent font-medium mb-5 before:content-[''] before:block before:w-6 before:h-px before:bg-accent">
                        Hoş Geldiniz
                    </p>
                    <h1 className="font-serif text-[clamp(2.2rem,4vw,3rem)] font-light text-dark leading-tight mb-2">
                        Hesabınıza<br />Giriş Yapın
                    </h1>
                    <p className="text-sm text-muted font-light mb-10">
                        Henüz üye değil misiniz?{' '}
                        <Link to="/register" className="text-accent hover:text-brown transition-colors font-medium underline underline-offset-2">
                            Üye olun
                        </Link>
                    </p>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border-l-2 border-red-500 px-4 py-3 mb-6"
                        >
                            <p className="text-sm text-red-700">{error}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">
                                E-posta Adresi
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ornek@email.com"
                                className="w-full border border-sand/60 bg-warm/40 px-4 py-3.5 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/70 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted">
                                    Şifre
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="text-[0.65rem] tracking-[0.1em] uppercase text-muted hover:text-dark transition-colors"
                                >
                                    {showPassword ? 'Gizle' : 'Göster'}
                                </button>
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full border border-sand/60 bg-warm/40 px-4 py-3.5 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/70 transition-colors"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 relative overflow-hidden group ${isLoading
                                ? 'bg-sand/40 text-muted cursor-not-allowed'
                                : 'bg-dark text-cream'
                                }`}
                        >
                            {!isLoading && (
                                <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out" />
                            )}
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Giriş yapılıyor...
                                    </>
                                ) : 'Giriş Yap'}
                            </span>
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-sand/40"></div>
                        <span className="text-[0.65rem] tracking-[0.1em] uppercase text-muted">veya</span>
                        <div className="flex-1 h-px bg-sand/40"></div>
                    </div>

                    {/* Back to shop */}
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full py-3.5 border border-sand/60 text-[0.75rem] tracking-[0.15em] uppercase text-muted hover:border-dark hover:text-dark transition-all duration-300 group"
                    >
                        <svg width="14" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 14 9" className="rotate-180 transition-transform group-hover:-translate-x-1 duration-300">
                            <line x1="0" y1="4.5" x2="12" y2="4.5" />
                            <polyline points="9,1 13,4.5 9,8" />
                        </svg>
                        Koleksiyona Dön
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
