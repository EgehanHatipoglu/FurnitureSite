import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            {/* Background backdrop */}
            <div
                className="fixed inset-0 bg-dark/60 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            ></div>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        {/* Slide-over panel */}
                        <div className="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500 sm:duration-700 bg-cream shadow-2xl flex flex-col h-full overflow-y-scroll">
                            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
                                <div className="flex items-start justify-between border-b border-sand/30 pb-6 mb-6">
                                    <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light text-dark font-serif" id="slide-over-title">Sepetiniz</h2>
                                    <div className="ml-3 flex h-7 items-center">
                                        <button
                                            type="button"
                                            className="relative -m-2 p-2 text-muted hover:text-accent transition-colors expand-cursor"
                                            onClick={toggleCart}
                                        >
                                            <span className="absolute -inset-0.5"></span>
                                            <span className="sr-only">Close panel</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flow-root">
                                        {cartItems.length === 0 ? (
                                            <div className="text-center py-16">
                                                <div className="text-4xl text-sand mb-6">🛒</div>
                                                <p className="text-muted font-light mb-8">Sepetiniz şu anda boş.</p>
                                                <button
                                                    onClick={toggleCart}
                                                    className="text-[0.8rem] tracking-[0.15em] uppercase font-medium px-8 py-3 bg-dark text-cream border border-dark transition-all duration-300 ease-out relative overflow-hidden inline-block group expand-cursor"
                                                >
                                                    <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                                                    <span className="relative z-10 group-hover:text-cream">Alışverişe Başla</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <ul role="list" className="-my-6 divide-y divide-sand/30">
                                                {cartItems.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="h-28 w-24 flex-shrink-0 overflow-hidden bg-sand flex items-center justify-center relative">
                                                            <img
                                                                src={product.images?.[0] || product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover scale-[1.05]"
                                                            />
                                                        </div>

                                                        <div className="ml-6 flex flex-1 flex-col justify-center gap-2">
                                                            <div>
                                                                <div className="flex justify-between text-base font-semibold text-dark mb-1">
                                                                    <h3 className="line-clamp-2 font-serif text-lg font-normal hover:text-accent transition-colors">
                                                                        <Link to={`/products/${product.id}`} onClick={toggleCart} className="expand-cursor">{product.name}</Link>
                                                                    </h3>
                                                                    <p className="ml-4 font-serif text-lg">${(product.price * product.quantity).toFixed(2)}</p>
                                                                </div>
                                                                <p className="text-[0.65rem] uppercase tracking-[0.15em] text-muted">{product.category}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                                                <div className="flex items-center border border-sand rounded-sm">
                                                                    <button
                                                                        type="button"
                                                                        className="px-3 py-1 text-muted hover:bg-white hover:text-dark transition-colors expand-cursor"
                                                                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                    <span className="px-3 py-1 font-medium text-dark border-x border-sand min-w-[2rem] text-center bg-transparent">
                                                                        {product.quantity}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="px-3 py-1 text-muted hover:bg-white hover:text-dark transition-colors expand-cursor"
                                                                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    className="text-[0.7rem] uppercase tracking-[0.1em] font-medium text-accent hover:text-brown transition-colors expand-cursor"
                                                                    onClick={() => removeFromCart(product.id)}
                                                                >
                                                                    Kaldır
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {cartItems.length > 0 && (
                                <div className="border-t border-sand/30 px-6 py-8 sm:px-8 bg-warm">
                                    <div className="flex justify-between text-lg text-dark mb-4">
                                        <p className="font-light">Ara Toplam</p>
                                        <p className="font-serif text-2xl">${cartTotal.toFixed(2)}</p>
                                    </div>
                                    <p className="text-[0.8rem] text-muted font-light mb-8">Kargo ve vergi ödeme adımında hesaplanacaktır.</p>

                                    <Link
                                        to="/checkout"
                                        onClick={toggleCart}
                                        className="w-full text-[0.8rem] tracking-[0.15em] uppercase font-medium px-10 py-4 bg-dark text-cream border border-dark transition-all duration-300 ease-out relative overflow-hidden inline-block group expand-cursor text-center"
                                    >
                                        <span className="absolute inset-0 bg-accent -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-400 ease-out"></span>
                                        <span className="relative z-10 group-hover:text-cream">Ödemeye Geç</span>
                                    </Link>

                                    <div className="mt-6 flex justify-center text-center text-[0.8rem] text-muted">
                                        <p>
                                            veya{' '}
                                            <button
                                                type="button"
                                                className="font-medium text-accent hover:text-brown transition-colors expand-cursor uppercase tracking-[0.1em] ml-1"
                                                onClick={toggleCart}
                                            >
                                                Alışverişe Devam
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
