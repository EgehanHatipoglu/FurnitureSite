import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <div className="bg-cream min-h-[75vh] pt-32 pb-24">
            <div className="mx-auto max-w-7xl px-8 lg:px-24">
                <div className="mb-16">
                    <p className="flex items-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-accent font-medium mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-accent">
                        Kişisel Seçimleriniz
                    </p>
                    <h1 className="font-serif text-[clamp(2.5rem,4vw,3.8rem)] font-light leading-[1.05] text-dark mb-6">
                        Favorileriniz
                    </h1>
                </div>

                {favorites.length === 0 ? (
                    <div className="text-center py-24 px-8 border border-sand/30 bg-warm rounded">
                        <div className="text-4xl text-sand mb-6">♡</div>
                        <h2 className="font-serif text-2xl font-light text-dark mb-4">Henüz favorilere ürün eklemediniz</h2>
                        <p className="text-[0.9rem] text-muted font-light mb-10 max-w-md mx-auto">
                            Koleksiyonlarımızı inceleyin ve beğendiğiniz ürünleri kalp ikonuna tıklayarak buraya kaydedin.
                        </p>
                        <Link
                            to="/#products"
                            className="text-[0.8rem] tracking-[0.15em] uppercase font-medium px-10 py-4 bg-dark text-cream border border-dark transition-all duration-300 ease-out relative overflow-hidden inline-block group expand-cursor"
                        >
                            <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                            <span className="relative z-10 group-hover:text-cream">Koleksiyonu Keşfet</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favorites.map((product) => (
                            <div key={product.id} className="animate-fadeUp opacity-0 [animation-fill-mode:forwards]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
