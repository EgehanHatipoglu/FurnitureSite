import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter State
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [priceRange, setPriceRange] = useState([0, 5000]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products. Please ensure the backend is running.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter logic
    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category?.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === 'Tümü' || p.category === selectedCategory;
        const matchPrice = Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1];
        return matchSearch && matchCategory && matchPrice;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64 bg-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-[1px] border-dark"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center shadow-sm max-w-2xl mx-auto my-12 border border-red-100">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <section id="products" className="py-32 px-8 lg:px-24 bg-cream">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <p className="flex items-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-accent font-medium mb-3 before:content-[''] before:block before:w-6 before:h-px before:bg-accent">
                        Seçkin Parçalar
                    </p>
                    <h2 className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-[1.1] text-dark">
                        En Çok<br /><em className="italic not-italic text-brown font-serif">Beğenilenler</em>
                    </h2>
                </div>
                <a href="#products" className="text-[0.8rem] tracking-[0.1em] uppercase text-brown font-normal flex items-center gap-2 transition-all duration-300 ease-out hover:gap-[14px] hover:text-accent expand-cursor">
                    Tümünü Gör
                    <svg width="16" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 10">
                        <line x1="0" y1="5" x2="14" y2="5" />
                        <polyline points="10,1 14,5 10,9" />
                    </svg>
                </a>
            </div>

            {/* Filter Bar */}
            <FilterBar
                search={search}
                setSearch={setSearch}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                totalResults={filtered.length}
            />

            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-4xl mb-4">🔍</p>
                    <p className="font-serif text-2xl font-light text-dark mb-2">Sonuç bulunamadı</p>
                    <p className="text-muted text-sm">Farklı arama veya filtre deneyin.</p>
                    <button
                        onClick={() => { setSearch(''); setSelectedCategory('Tümü'); setPriceRange([0, 1500]); }}
                        className="mt-6 text-[0.75rem] uppercase tracking-[0.15em] border border-sand/50 px-8 py-3 text-muted hover:border-dark hover:text-dark transition-all duration-300"
                    >
                        Filtreleri Temizle
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filtered.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
};

export default ProductList;
