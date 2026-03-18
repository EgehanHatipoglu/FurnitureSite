import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        setIsLoading(true);
        const result = await register(name, email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
            setIsLoading(false);
        }
    };

    const benefits = [
        { icon: '♡', text: 'Favori ürünlerinizi kaydedin' },
        { icon: '📦', text: 'Siparişlerinizi takip edin' },
        { icon: '🪄', text: 'AI tasarım önerilerinden yararlanın' },
        { icon: '✦', text: 'Özel kampanyalardan haberdar olun' },
    ];

    return (
        <div className="min-h-screen bg-cream grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: form panel ── */}
            <div className="flex flex-col justify-center px-8 py-20 sm:px-16 lg:px-20 order-2 lg:order-1">

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
                        Ücretsiz Üyelik
                    </p>
                    <h1 className="font-serif text-[clamp(2.2rem,4vw,3rem)] font-light text-dark leading-tight mb-2">
                        Hesap<br />Oluşturun
                    </h1>
                    <p className="text-sm text-muted font-light mb-10">
                        Zaten üye misiniz?{' '}
                        <Link to="/login" className="text-accent hover:text-brown transition-colors font-medium underline underline-offset-2">
                            Giriş yapın
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
                        {/* Name */}
                        <div>
                            <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">
                                Ad Soyad
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Emre Yılmaz"
                                className="w-full border border-sand/60 bg-warm/40 px-4 py-3.5 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/70 transition-colors"
                            />
                        </div>

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
                                placeholder="En az 6 karakter"
                                className="w-full border border-sand/60 bg-warm/40 px-4 py-3.5 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/70 transition-colors"
                            />
                            {/* Password strength bar */}
                            {password.length > 0 && (
                                <div className="mt-2 flex gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                                                password.length >= i * 3
                                                    ? i <= 2 ? 'bg-red-400' : i === 3 ? 'bg-yellow-400' : 'bg-green-500'
                                                    : 'bg-sand/40'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Terms note */}
                        <p className="text-[0.65rem] text-muted leading-relaxed">
                            Üye olarak{' '}
                            <span className="text-dark underline underline-offset-2 cursor-pointer hover:text-accent transition-colors">Kullanım Koşulları</span>
                            {' '}ve{' '}
                            <span className="text-dark underline underline-offset-2 cursor-pointer hover:text-accent transition-colors">Gizlilik Politikası</span>
                            'nı kabul etmiş olursunuz.
                        </p>

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
                                        Hesap oluşturuluyor...
                                    </>
                                ) : 'Üye Ol'}
                            </span>
                        </button>
                    </form>

                    {/* Back to shop */}
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full mt-4 py-3.5 border border-sand/60 text-[0.75rem] tracking-[0.15em] uppercase text-muted hover:border-dark hover:text-dark transition-all duration-300 group"
                    >
                        <svg width="14" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 14 9" className="rotate-180 transition-transform group-hover:-translate-x-1 duration-300">
                            <line x1="0" y1="4.5" x2="12" y2="4.5" />
                            <polyline points="9,1 13,4.5 9,8" />
                        </svg>
                        Koleksiyona Dön
                    </Link>
                </motion.div>
            </div>

            {/* ── Right: decorative panel ── */}
            <div className="hidden lg:flex flex-col justify-between bg-dark p-16 relative overflow-hidden order-1 lg:order-2">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&q=80&auto=format&fit=crop"
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
                </div>

                {/* Decorative number */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[14rem] font-light text-white/5 leading-none select-none pointer-events-none tracking-tighter">
                    02
                </div>

                {/* Logo */}
                <div className="relative z-10">
                    <Link to="/" className="font-serif text-3xl font-light tracking-[0.25em] text-white">
                        ORM<span className="text-accent">A</span>N
                    </Link>
                </div>

                {/* Benefits */}
                <div className="relative z-10">
                    <p className="text-[0.7rem] tracking-[0.2em] uppercase text-sand/70 mb-8 flex items-center gap-3">
                        <span className="w-8 h-px bg-accent"></span>
                        Üyelik Avantajları
                    </p>
                    <ul className="space-y-5">
                        {benefits.map((b, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                className="flex items-center gap-4"
                            >
                                <span className="w-9 h-9 bg-white/5 border border-white/10 flex items-center justify-center text-base flex-shrink-0">
                                    {b.icon}
                                </span>
                                <p className="text-[0.9rem] text-sand font-light">{b.text}</p>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Bottom tagline */}
                <div className="relative z-10 border-t border-white/10 pt-10">
                    <p className="font-serif text-xl font-light text-white/60 leading-relaxed">
                        Doğadan ilham alan tasarımlar,<br />
                        <em className="text-sand italic">yaşam alanınıza ruh katar.</em>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
