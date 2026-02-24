import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <div className="bg-cream">
            <HeroSection />
            <ProductList />

            {/* FEATURED BANNER */}
            <div className="mx-8 lg:mx-24 mb-32 bg-dark rounded-xl p-10 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden relative">
                <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 rotate-90 font-serif text-[10rem] font-light text-white/5 tracking-[0.2em] select-none pointer-events-none">
                    2026
                </div>
                <div className="relative z-10">
                    <p className="flex items-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-sand font-light mb-6 before:content-[''] before:block before:w-6 before:h-px before:bg-accent">
                        2026 Koleksiyonu
                    </p>
                    <h2 className="font-serif text-[clamp(2.5rem,4vw,3.8rem)] font-light leading-[1.05] text-white mb-8">
                        Eski Dünya<br />Zanaatı, <em className="italic not-italic text-sand font-serif">Yeni<br />Çağ Estetiği</em>
                    </h2>
                    <p className="text-[0.95rem] leading-[1.7] text-sand font-light mb-12">
                        Türkiye'nin köklü marangoz ustalarıyla iş birliği yaparak yarattığımız bu koleksiyon, her evin hikayesine özgün bir sayfa ekliyor.
                    </p>
                    <div className="flex flex-wrap gap-12 mb-12">
                        <div>
                            <p className="font-serif text-[2.5rem] font-light text-white leading-none">200+</p>
                            <p className="text-[0.7rem] tracking-[0.15em] uppercase text-sand mt-1">Benzersiz Tasarım</p>
                        </div>
                        <div>
                            <p className="font-serif text-[2.5rem] font-light text-white leading-none">40+</p>
                            <p className="text-[0.7rem] tracking-[0.15em] uppercase text-sand mt-1">Usta Zanaatkar</p>
                        </div>
                        <div>
                            <p className="font-serif text-[2.5rem] font-light text-white leading-none">15</p>
                            <p className="text-[0.7rem] tracking-[0.15em] uppercase text-sand mt-1">Yıl Deneyim</p>
                        </div>
                    </div>
                    <Link to="/#about" className="text-[0.8rem] tracking-[0.15em] uppercase font-medium px-10 py-4 bg-transparent text-white border border-white hover:border-accent transition-all duration-350 ease-out relative overflow-hidden inline-block group expand-cursor">
                        <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                        <span className="relative z-10 group-hover:text-white">Hikayemiz</span>
                    </Link>
                </div>
                <div className="rounded overflow-hidden aspect-[4/5] bg-brown relative z-10">
                    <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=85&auto=format&fit=crop" alt="Usta çalışıyor" loading="lazy" />
                </div>
            </div>

            {/* PROCESS */}
            <section className="py-24 lg:py-32 px-8 lg:px-24 bg-warm" id="process">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <p className="flex items-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-accent font-medium mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-accent">
                            Nasıl Çalışıyoruz
                        </p>
                        <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.1] text-dark">
                            Mükemmele<br /><em className="italic not-italic text-brown font-serif">Giden Yol</em>
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mt-16 relative">
                    <div className="relative">
                        <div className="font-serif text-[4rem] font-light text-[#7A5C3E]/15 leading-none mb-4 tracking-tighter">01</div>
                        <div className="w-12 h-12 rounded-full bg-cream border border-sand flex items-center justify-center mb-6 text-[1.2rem] shadow-sm">🎨</div>
                        <h3 className="font-serif text-[1.3rem] font-normal text-dark mb-3">Tasarım & Fikir</h3>
                        <p className="text-[0.875rem] leading-[1.65] text-muted font-light">Uzman tasarımcılarımız yaşam alanınızı dinler, ihtiyaçlarınıza özel çizimler hazırlar.</p>
                        <div className="hidden lg:block absolute top-[68px] left-[70px] -right-[32px] h-px bg-sand/50"></div>
                    </div>
                    <div className="relative">
                        <div className="font-serif text-[4rem] font-light text-[#7A5C3E]/15 leading-none mb-4 tracking-tighter">02</div>
                        <div className="w-12 h-12 rounded-full bg-cream border border-sand flex items-center justify-center mb-6 text-[1.2rem] shadow-sm">🌲</div>
                        <h3 className="font-serif text-[1.3rem] font-normal text-dark mb-3">Malzeme Seçimi</h3>
                        <p className="text-[0.875rem] leading-[1.65] text-muted font-light">Sertifikalı, sürdürülebilir ahşaplar ve premium kumaşlar titizlikle seçilir.</p>
                        <div className="hidden lg:block absolute top-[68px] left-[70px] -right-[32px] h-px bg-sand/50"></div>
                    </div>
                    <div className="relative">
                        <div className="font-serif text-[4rem] font-light text-[#7A5C3E]/15 leading-none mb-4 tracking-tighter">03</div>
                        <div className="w-12 h-12 rounded-full bg-cream border border-sand flex items-center justify-center mb-6 text-[1.2rem] shadow-sm">🔨</div>
                        <h3 className="font-serif text-[1.3rem] font-normal text-dark mb-3">El Üretimi</h3>
                        <p className="text-[0.875rem] leading-[1.65] text-muted font-light">Deneyimli ustalarımız her parçayı elle şekillendirir, yüzeyleri tek tek işler.</p>
                        <div className="hidden lg:block absolute top-[68px] left-[70px] -right-[32px] h-px bg-sand/50"></div>
                    </div>
                    <div className="relative">
                        <div className="font-serif text-[4rem] font-light text-[#7A5C3E]/15 leading-none mb-4 tracking-tighter">04</div>
                        <div className="w-12 h-12 rounded-full bg-cream border border-sand flex items-center justify-center mb-6 text-[1.2rem] shadow-sm">🏠</div>
                        <h3 className="font-serif text-[1.3rem] font-normal text-dark mb-3">Teslim & Montaj</h3>
                        <p className="text-[0.875rem] leading-[1.65] text-muted font-light">Özenli paketleme, beyaz eldiven teslimat ve ücretsiz profesyonel montaj.</p>
                    </div>
                </div>
            </section>

            {/* TESTIMONIAL */}
            <section className="py-24 lg:py-32 px-8 lg:px-24">
                <div className="bg-cream border border-sand rounded p-10 lg:p-16 max-w-3xl mx-auto text-center shadow-[0_20px_60px_-10px_rgba(42,31,20,0.05)] relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cream border border-sand rounded-full flex items-center justify-center">
                        <span className="font-serif text-3xl font-light text-accent opacity-50">"</span>
                    </div>
                    <p className="text-accent text-base tracking-[4px] mb-8 mt-4">★★★★★</p>
                    <blockquote className="font-serif text-[clamp(1.4rem,2vw,1.8rem)] font-normal leading-[1.5] text-dark italic mb-8">
                        "Yemek odası masasını aldığımda kutuyu açar açmaz anladım ki bu sadece bir mobilya değil, nesiller boyu taşınacak bir miras parçası."
                    </blockquote>
                    <p className="text-[0.8rem] tracking-[0.12em] uppercase text-muted">
                        <strong className="text-brown block mb-1 font-medium text-[0.85rem] tracking-[0.08em] normal-case">Ayşe Kaya</strong>
                        İstanbul · Müşteri, 2026
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
