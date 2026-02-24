import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const isFav = isFavorite(product.id);
    const hasDiscount = product.discount > 0;
    const isPopular = product.viewCount > 30;

    return (
        <article className="relative h-full flex flex-col bg-warm rounded overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_64px_-16px_rgba(42,31,20,0.18)] group expand-cursor">
            <Link to={`/products/${product.id}`} className="block relative aspect-[4/3] shrink-0 overflow-hidden bg-sand z-0">
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {hasDiscount && (
                        <span className="bg-red-600 text-white text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm font-semibold flex items-center gap-1">
                            %{product.discount} İndirim
                        </span>
                    )}
                    {isPopular && (
                        <span className="bg-accent text-white text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm font-semibold flex items-center gap-1">
                            Popüler
                        </span>
                    )}
                    {!hasDiscount && !isPopular && (
                        <span className="bg-accent text-white text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm font-medium">
                            Yeni
                        </span>
                    )}
                </div>

                <img
                    className="w-full h-full object-contain transition-transform duration-800 ease-out group-hover:scale-[1.02] p-6"
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    loading="lazy"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,31,20,0.6)] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100 z-10 pointer-events-none"></div>

                {/* Quick Add Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                    }}
                    className="absolute bottom-6 left-6 right-6 bg-cream text-dark text-[0.75rem] tracking-[0.1em] uppercase font-medium py-3 text-center rounded-sm translate-y-2.5 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-20 hover:bg-dark hover:text-white"
                >
                    Sepete Ekle
                </button>
            </Link>

            <div className="p-6 relative z-10 bg-warm flex flex-col flex-1">
                <p className="text-[0.7rem] tracking-[0.15em] uppercase text-muted mb-1.5">
                    {product.category}
                </p>
                <h3 className="font-serif text-[1.3rem] font-normal text-dark mb-4 leading-[1.2] flex-1">
                    <Link to={`/products/${product.id}`} className="hover:text-accent transition-colors">
                        {product.name}
                    </Link>
                </h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <p className={`text-[1.1rem] font-medium ${hasDiscount ? 'text-red-600' : 'text-brown'}`}>
                            ${product.price}
                        </p>
                        {hasDiscount && (
                            <p className="text-[0.85rem] text-muted line-through">
                                ${product.originalPrice}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => toggleFavorite(product)}
                        aria-label={isFav ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                        className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${isFav ? 'bg-accent border-accent text-white' : 'border-sand bg-transparent text-muted hover:bg-accent hover:border-accent hover:text-white'}`}
                    >
                        {isFav ? '♥' : '♡'}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
