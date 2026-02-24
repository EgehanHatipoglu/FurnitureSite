import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { toggleCart, cartCount } = useCart();
    const { favoritesCount } = useFavorites();
    const { user, logout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Check if on home page products section
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 top-0 left-0 flex items-center justify-between px-6 lg:px-16 transition-all duration-500 backdrop-blur-md bg-cream/85 border-b border-sand/30 ${scrolled ? 'py-4' : 'py-6'}`}>
            <Link to="/" className="font-serif text-2xl lg:text-3xl font-light tracking-[0.25em] text-dark expand-cursor outline-none focus:outline-none">
                ORM<span className="text-accent">A</span>N
            </Link>

            <ul className="hidden lg:flex gap-12 ml-8">
                <li><Link to="/#products" className="text-[0.8rem] font-light tracking-[0.12em] uppercase text-customtext relative transition-colors duration-300 hover:text-accent after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-500 hover:after:w-full expand-cursor">Koleksiyon</Link></li>
                <li><Link to="/favorites" className="text-[0.8rem] font-light tracking-[0.12em] uppercase text-customtext relative transition-colors duration-300 hover:text-accent after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-500 hover:after:w-full expand-cursor">Favoriler</Link></li>
                <li><Link to="/orders" className="text-[0.8rem] font-light tracking-[0.12em] uppercase text-customtext relative transition-colors duration-300 hover:text-accent after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-500 hover:after:w-full expand-cursor">Siparişlerim</Link></li>
                <li><Link to="/#process" className="text-[0.8rem] font-light tracking-[0.12em] uppercase text-customtext relative transition-colors duration-300 hover:text-accent after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent after:transition-all after:duration-500 hover:after:w-full expand-cursor">Hakkımızda</Link></li>
                <li>
                    <Link to="/designer" className="text-[0.8rem] font-light tracking-[0.12em] uppercase text-accent relative transition-colors duration-300 hover:text-accent/70 flex items-center gap-2 expand-cursor">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
                        AI Design
                    </Link>
                </li>
            </ul>

            <div className="flex items-center gap-4 lg:gap-6">
                {user ? (
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-[0.7rem] tracking-[0.1em] uppercase text-muted">Merhaba, {user.name}</span>
                        <button onClick={logout} className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-red-700/80 hover:text-red-700 transition-colors expand-cursor">Çıkış</button>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-customtext hover:text-accent transition-colors expand-cursor">Giriş</Link>
                        <Link to="/register" className="text-[0.7rem] tracking-[0.15em] uppercase border border-dark px-4 py-2 font-medium text-dark hover:bg-dark hover:text-cream transition-all duration-300 expand-cursor">Üye Ol</Link>
                    </div>
                )}

                <div className="flex items-center gap-4 border-l border-sand/30 pl-4 lg:pl-6 ml-2 lg:ml-0">
                    <Link to="/favorites" className="relative text-customtext hover:text-accent transition-colors expand-cursor" aria-label="Favorites">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        {favoritesCount > 0 && (
                            <div className="absolute -top-1.5 -right-2 inline-flex items-center justify-center w-4 h-4 text-[0.6rem] font-bold text-white bg-accent rounded-full">
                                {favoritesCount}
                            </div>
                        )}
                    </Link>

                    <button onClick={toggleCart} className="relative text-customtext hover:text-accent transition-colors expand-cursor" aria-label="Cart">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        {cartCount > 0 && (
                            <div className="absolute -top-1.5 -right-2 inline-flex items-center justify-center w-4 h-4 text-[0.6rem] font-bold text-white bg-dark rounded-full">
                                {cartCount}
                            </div>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button type="button" className="lg:hidden inline-flex items-center justify-center text-customtext hover:text-accent" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
