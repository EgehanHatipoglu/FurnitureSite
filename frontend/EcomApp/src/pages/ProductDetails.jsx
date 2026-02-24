import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-[1px] border-dark"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-cream text-center px-4">
                <h2 className="font-serif text-3xl font-light text-dark mb-4">Ürün Bulunamadı</h2>
                <p className="text-muted font-light mb-8 max-w-md">{error || "Aradığınız ürün silinmiş veya yayından kaldırılmış olabilir."}</p>
                <Link to="/" className="text-[0.8rem] tracking-[0.15em] uppercase font-medium px-8 py-3 bg-dark text-cream hover:bg-accent transition-colors expand-cursor">
                    Koleksiyona Dön
                </Link>
            </div>
        );
    }

    const isFav = isFavorite(product?.id);

    return (
        <div className="bg-cream min-h-screen pt-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-16 py-12 lg:py-20">
                <nav aria-label="Breadcrumb" className="mb-12">
                    <ol role="list" className="flex items-center space-x-2 text-[0.7rem] uppercase tracking-[0.15em] text-muted font-medium">
                        <li><Link to="/" className="hover:text-accent transition-colors expand-cursor">Ana Sayfa</Link></li>
                        <li><span className="text-sand mx-2">/</span></li>
                        <li><Link to="/#products" className="hover:text-accent transition-colors expand-cursor">Koleksiyon</Link></li>
                        <li><span className="text-sand mx-2">/</span></li>
                        <li className="text-dark font-medium">{product.name}</li>
                    </ol>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-20">
                    {/* Product Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-sand relative shadow-sm">
                        <img
                            src={product.images?.[0] || product.image}
                            alt={product.name}
                            className="h-full w-full object-contain p-10"
                        />
                        <div className="absolute top-6 left-6 rounded-sm bg-warm/90 backdrop-blur-sm px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] text-dark z-10">
                            {product.category}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-12 px-4 sm:px-0 lg:mt-0 lg:py-10">
                        {/* Badges */}
                        <div className="flex items-center gap-3 mb-5">
                            {product.discount > 0 && (
                                <span className="bg-red-600 text-white text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 rounded-sm font-semibold">
                                    %{product.discount} İndirim
                                </span>
                            )}
                            {product.viewCount > 30 && (
                                <span className="bg-accent/90 text-white text-[0.65rem] tracking-[0.1em] uppercase px-3 py-1 rounded-sm font-semibold">
                                    Popüler
                                </span>
                            )}
                        </div>

                        <h1 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-none text-dark mb-6">
                            {product.name}
                        </h1>

                        <div className="mb-4">
                            <div className="flex items-center gap-4">
                                <p className={`font-serif text-3xl font-normal ${product.discount > 0 ? 'text-red-600' : 'text-brown'}`}>
                                    ${product.price}
                                </p>
                                {product.discount > 0 && (
                                    <p className="font-serif text-xl text-muted line-through">
                                        ${product.originalPrice}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* View count indicator */}
                        {product.viewCount > 10 && (
                            <p className="text-[0.75rem] text-accent font-medium mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
                                Bu hafta {product.viewCount} kişi baktı
                            </p>
                        )}

                        <div className="border-t border-sand/30 pt-8 mb-10">
                            <p className="text-[0.95rem] leading-[1.8] text-muted font-light">
                                {product.description}
                                <br /><br />
                                Her parçamız el işçiliği ile özenle üretilmiş olup, sürdürülebilir ormanlardan elde edilen premium ahşap kullanılarak tasarlanmıştır. Zamansız tasarımıyla mekanınıza doğal bir dokunuş katar.
                            </p>
                        </div>

                        <div className="flex items-center gap-6 mb-12">
                            <button
                                type="button"
                                onClick={() => addToCart(product)}
                                className="flex-1 text-[0.8rem] tracking-[0.15em] uppercase font-medium px-10 py-5 bg-dark text-cream border border-dark transition-all duration-300 ease-out relative overflow-hidden group expand-cursor text-center"
                            >
                                <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                                <span className="relative z-10 group-hover:text-cream">Sepete Ekle</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleFavorite(product)}
                                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors duration-300 expand-cursor shrink-0 ${isFav ? 'bg-accent border-accent text-white' : 'border-sand bg-transparent text-muted hover:bg-accent hover:border-accent hover:text-white'}`}
                                aria-label="Favorilere Ekle"
                            >
                                <span className="text-xl leading-none">{isFav ? '♥' : '♡'}</span>
                            </button>
                        </div>

                        {/* Features */}
                        <div className="border-t border-sand/30 pt-10">
                            <h3 className="text-[0.7rem] uppercase tracking-[0.2em] font-medium text-dark mb-6 before:content-[''] before:inline-block before:w-6 before:h-px before:bg-accent before:mr-4 before:align-middle items-center flex">
                                Ürün Özellikleri
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                <li className="flex items-center">
                                    <span className="text-accent text-[0.6rem] leading-none mr-3">✦</span>
                                    <span className="text-muted text-[0.85rem] font-light">Premium Malzemeler</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-accent text-[0.6rem] leading-none mr-3">✦</span>
                                    <span className="text-muted text-[0.85rem] font-light">Ücretsiz ve Güvenli Kargo</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-accent text-[0.6rem] leading-none mr-3">✦</span>
                                    <span className="text-muted text-[0.85rem] font-light">15 Yıl Garanti Tahaattüdü</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-accent text-[0.6rem] leading-none mr-3">✦</span>
                                    <span className="text-muted text-[0.85rem] font-light">Ücretsiz Montaj Desteği</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
