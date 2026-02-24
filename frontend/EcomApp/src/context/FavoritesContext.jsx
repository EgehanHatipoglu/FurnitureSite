import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (product) => {
        setFavorites(prev => {
            const exists = prev.find(item => String(item.id) === String(product.id));
            if (exists) {
                return prev.filter(item => String(item.id) !== String(product.id));
            } else {
                return [...prev, product];
            }
        });
    };

    const isFavorite = (productId) => {
        return favorites.some(item => String(item.id) === String(productId));
    };

    const favoritesCount = favorites.length;

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesCount }}>
            {children}
        </FavoritesContext.Provider>
    );
};
