import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <>
            <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 lg:pt-20 overflow-hidden bg-cream">
                <div className="flex flex-col justify-center px-8 py-32 md:px-16 lg:pl-24 lg:pr-16 z-10">
                    <p className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] uppercase text-accent font-medium mb-8 opacity-0 translate-y-5 animate-fadeUp [animation-delay:200ms] before:content-[''] before:block before:w-8 before:h-[1px] before:bg-accent">
                        Yeni Koleksiyon · 2026
                    </p>
                    <h1 className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] font-light text-dark mb-8 opacity-0 translate-y-8 animate-fadeUp [animation-delay:350ms]">
                        Doğadan<br />İlham Alan<br /><em className="not-italic italic text-brown font-serif">Yaşamlar</em>
                    </h1>
                    <p className="text-base leading-[1.7] text-muted font-light max-w-[380px] mb-16 opacity-0 translate-y-5 animate-fadeUp [animation-delay:500ms]">
                        Her parça, seçilmiş ahşapların doğal dokusunu ve esnaf elinin izini taşır. Yaşam alanınıza ruh katmak için tasarlandı.
                    </p>
                    <div className="flex flex-wrap items-center gap-8 opacity-0 translate-y-5 animate-fadeUp [animation-delay:650ms]">
                        <a href="#products" className="text-[0.8rem] tracking-[0.15em] uppercase font-medium px-10 py-4 bg-dark text-cream border border-dark transition-all duration-300 ease-out relative overflow-hidden inline-block group expand-cursor">
                            <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                            <span className="relative z-10 group-hover:text-cream">Koleksiyonu Keşfet</span>
                        </a>
                        <a href="#process" className="text-[0.8rem] tracking-[0.1em] uppercase text-brown font-normal flex items-center gap-2 transition-all duration-300 ease-out hover:gap-[14px] hover:text-accent expand-cursor">
                            Nasıl Üretiyoruz
                            <svg width="16" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 10">
                                <line x1="0" y1="5" x2="14" y2="5" />
                                <polyline points="10,1 14,5 10,9" />
                            </svg>
                        </a>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.0, ease: 'easeOut' }}
                        className="mt-8"
                    >
                        <Link
                            to="/designer"
                            className="inline-flex items-center gap-3 text-[0.75rem] tracking-[0.18em] uppercase font-medium text-dark border border-sand/60 bg-cream/80 backdrop-blur-sm px-6 py-3.5 transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 hover:text-accent group expand-cursor"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                            </span>
                            AI ile Odanda Görüntüle
                            <svg width="14" height="9" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 14 9" className="transition-transform duration-300 group-hover:translate-x-1">
                                <line x1="0" y1="4.5" x2="12" y2="4.5" />
                                <polyline points="9,1 13,4.5 9,8" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
                <div className="relative overflow-hidden opacity-0 animate-fadeIn [animation-delay:300ms] h-[60vw] lg:h-auto z-0">
                    <img className="w-full h-full object-cover object-bottom" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80&auto=format&fit=crop&crop=bottom" alt="Lüks kanepe" loading="eager" />
                    <div className="hidden lg:block absolute bottom-16 -left-8 bg-cream p-6 px-8 rounded shadow-[0_20px_60px_-10px_rgba(42,31,20,0.15)] min-w-[200px] opacity-0 -translate-x-5 animate-fadeUp [animation-delay:1200ms]">
                        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-1">Bu Hafta Öne Çıkan</p>
                        <p className="font-serif text-[1.4rem] font-normal text-dark">Meşe Koltuk</p>
                        <p className="text-[0.75rem] text-muted mt-0.5">El yapımı · Sürdürülebilir ahşap</p>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="bg-dark py-6 overflow-hidden">
                <div className="flex gap-16 animate-marquee whitespace-nowrap w-max">
                    {[...Array(2)].map((_, idx) => (
                        <div key={idx} className="flex gap-16 shrink-0">
                            <span className="flex items-center gap-6 text-[0.75rem] tracking-[0.2em] uppercase text-sand font-light">
                                <span className="w-1 h-1 bg-accent rounded-full"></span> El İşçiliği
                            </span>
                            <span className="flex items-center gap-6 text-[0.75rem] tracking-[0.2em] uppercase text-sand font-light">
                                <span className="w-1 h-1 bg-accent rounded-full"></span> Sürdürülebilir Malzeme
                            </span>
                            <span className="flex items-center gap-6 text-[0.75rem] tracking-[0.2em] uppercase text-sand font-light">
                                <span className="w-1 h-1 bg-accent rounded-full"></span> 15 Yıl Garanti
                            </span>
                            <span className="flex items-center gap-6 text-[0.75rem] tracking-[0.2em] uppercase text-sand font-light">
                                <span className="w-1 h-1 bg-accent rounded-full"></span> Ücretsiz Montaj
                            </span>
                            <span className="flex items-center gap-6 text-[0.75rem] tracking-[0.2em] uppercase text-sand font-light">
                                <span className="w-1 h-1 bg-accent rounded-full"></span> Özel Tasarım
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HeroSection;
