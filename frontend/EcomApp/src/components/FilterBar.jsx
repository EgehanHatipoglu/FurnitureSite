import React from 'react';

const CATEGORIES = ['Tümü', 'Living Room', 'Dining', 'Bedroom', 'Office', 'Outdoor', 'Lighting'];

const FilterBar = ({ search, setSearch, selectedCategory, setSelectedCategory, priceRange, setPriceRange, totalResults }) => {
    return (
        <div className="bg-white border border-sand/40 p-6 mb-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end">

                {/* Search */}
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-[0.6rem] tracking-[0.18em] uppercase text-muted mb-2">Ürün Ara</label>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Koltuk, masa, lamba..."
                            className="w-full border border-sand/50 bg-cream/40 pl-10 pr-4 py-2.5 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/60 transition-colors"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Price Range */}
                <div className="min-w-[200px]">
                    <label className="block text-[0.6rem] tracking-[0.18em] uppercase text-muted mb-2">
                        Fiyat: <span className="text-dark font-medium">${priceRange[0]} — ${priceRange[1]}</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={e => setPriceRange([0, parseInt(e.target.value, 10)])}
                        className="w-full h-1 bg-sand/50 rounded-lg appearance-none cursor-pointer accent-dark"
                    />
                    <div className="flex justify-between text-[0.55rem] text-muted/60 mt-1">
                        <span>$0</span><span>$5000</span>
                    </div>
                </div>

                {/* Results count */}
                <div className="text-[0.65rem] text-muted">
                    <span className="text-dark font-medium">{totalResults}</span> ürün
                </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-sand/30">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 text-[0.65rem] tracking-[0.1em] uppercase border transition-all duration-200 ${selectedCategory === cat
                            ? 'bg-dark text-cream border-dark'
                            : 'border-sand/50 text-muted hover:border-brown/50 hover:text-dark'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
