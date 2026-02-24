import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { AuthContext } from '../context/AuthContext';

const steps = ['Teslimat', 'Ödeme', 'Özet'];

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [isPlacing, setIsPlacing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(null);

    const [shipping, setShipping] = useState({
        firstName: '', lastName: '', email: user?.email || '', phone: '',
        address: '', city: '', postalCode: '', country: 'Türkiye',
    });

    const [payment, setPayment] = useState({
        cardHolder: '', cardNumber: '', expiry: '', cvv: '',
    });

    const formatCardNumber = (val) =>
        val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

    const formatExpiry = (val) => {
        const clean = val.replace(/\D/g, '').slice(0, 4);
        return clean.length >= 3 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
    };

    const shippingFilled = shipping.firstName && shipping.lastName && shipping.email &&
        shipping.address && shipping.city && shipping.postalCode;

    const paymentFilled = payment.cardHolder && payment.cardNumber.length >= 19 &&
        payment.expiry.length >= 5 && payment.cvv.length >= 3;

    const handlePlaceOrder = async () => {
        setIsPlacing(true);
        await new Promise(r => setTimeout(r, 1500)); // Simulate processing

        const order = await placeOrder({
            cartItems,
            shippingInfo: shipping,
            totalAmount: (cartTotal + 0).toFixed(2),
            userId: user?.id || 'guest',
        });

        clearCart();
        setOrderPlaced(order);
        setIsPlacing(false);
    };

    // Order success screen
    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center px-6 pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white border border-sand/40 p-12 max-w-lg w-full text-center"
                >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="font-serif text-3xl font-light text-dark mb-3">Siparişiniz Alındı!</h1>
                    <p className="text-muted text-sm mb-2">Sipariş No: <span className="font-medium text-dark">{orderPlaced.id}</span></p>
                    <p className="text-muted text-sm mb-8">Tahmini teslimat: <span className="font-medium text-dark">{orderPlaced.estimatedDelivery}</span></p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/orders" className="text-[0.75rem] uppercase tracking-[0.15em] bg-dark text-cream px-8 py-3.5 hover:bg-accent transition-all duration-300">
                            Siparişimi Takip Et
                        </Link>
                        <Link to="/" className="text-[0.75rem] uppercase tracking-[0.15em] border border-sand/50 px-8 py-3.5 text-muted hover:border-dark hover:text-dark transition-all duration-300">
                            Ana Sayfa
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center px-6 pt-24">
                <h2 className="font-serif text-3xl font-light text-dark mb-4">Sepetiniz Boş</h2>
                <p className="text-muted mb-8">Ödeme yapabilmek için sepetinize ürün ekleyin.</p>
                <Link to="/#products" className="text-[0.8rem] uppercase tracking-[0.15em] bg-dark text-cream px-8 py-4 hover:bg-accent transition-all">
                    Ürünlere Dön
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-6 lg:px-16">

                {/* Header */}
                <div className="mb-12">
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-accent mb-2">Orman Mobilya</p>
                    <h1 className="font-serif text-4xl font-light text-dark">Ödeme</h1>
                </div>

                {/* Step indicator */}
                <div className="flex items-center max-w-sm mb-12">
                    {steps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`w-8 h-8 flex items-center justify-center text-[0.7rem] font-medium border transition-all duration-500 ${i <= currentStep ? 'bg-dark border-dark text-cream' : 'border-sand/50 text-muted'}`}>
                                    {i < currentStep ? '✓' : i + 1}
                                </div>
                                <span className={`text-[0.6rem] tracking-[0.1em] uppercase ${i <= currentStep ? 'text-dark' : 'text-muted'}`}>{step}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`flex-1 h-[1px] mx-3 mt-[-12px] ${i < currentStep ? 'bg-dark' : 'bg-sand/40'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left: Form */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">

                            {/* Step 0 — Shipping */}
                            {currentStep === 0 && (
                                <motion.div key="shipping"
                                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                                    className="bg-white border border-sand/40 p-8"
                                >
                                    <h2 className="font-serif text-2xl font-light text-dark mb-8">Teslimat Bilgileri</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {[
                                            { label: 'Ad', key: 'firstName', placeholder: 'Emre' },
                                            { label: 'Soyad', key: 'lastName', placeholder: 'Yılmaz' },
                                            { label: 'E-posta', key: 'email', placeholder: 'emre@orman.com', col: 2 },
                                            { label: 'Telefon', key: 'phone', placeholder: '+90 5XX XXX XX XX', col: 2 },
                                            { label: 'Adres', key: 'address', placeholder: 'Sokak, Mahalle, Bina No', col: 2 },
                                            { label: 'Şehir', key: 'city', placeholder: 'İstanbul' },
                                            { label: 'Posta Kodu', key: 'postalCode', placeholder: '34000' },
                                        ].map(({ label, key, placeholder, col }) => (
                                            <div key={key} className={col === 2 ? 'col-span-2' : ''}>
                                                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">{label}</label>
                                                <input
                                                    type="text"
                                                    value={shipping[key]}
                                                    onChange={e => setShipping(s => ({ ...s, [key]: e.target.value }))}
                                                    placeholder={placeholder}
                                                    className="w-full border border-sand/50 bg-cream/40 px-4 py-3 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/60 transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        disabled={!shippingFilled}
                                        className={`mt-8 w-full py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all ${shippingFilled ? 'bg-dark text-cream hover:bg-accent' : 'bg-sand/40 text-muted cursor-not-allowed'}`}
                                    >
                                        Ödeme Bilgilerine Geç →
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 1 — Payment */}
                            {currentStep === 1 && (
                                <motion.div key="payment"
                                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                                    className="bg-white border border-sand/40 p-8"
                                >
                                    <h2 className="font-serif text-2xl font-light text-dark mb-8">Ödeme Bilgileri</h2>

                                    {/* Card preview */}
                                    <div className="bg-gradient-to-br from-dark to-brown rounded-xl p-6 mb-8 text-cream relative overflow-hidden shadow-lg">
                                        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full"></div>
                                        <div className="absolute -right-4 bottom-0 w-24 h-24 bg-white/5 rounded-full"></div>
                                        <p className="font-serif tracking-[0.3em] text-xl mb-8 opacity-90">
                                            {payment.cardNumber || '•••• •••• •••• ••••'}
                                        </p>
                                        <div className="flex justify-between text-sm">
                                            <div>
                                                <p className="text-[0.6rem] uppercase tracking-widest opacity-60 mb-1">Kart Sahibi</p>
                                                <p className="tracking-widest">{payment.cardHolder || '——————'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[0.6rem] uppercase tracking-widest opacity-60 mb-1">Son Tarih</p>
                                                <p>{payment.expiry || 'MM/YY'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-5">
                                        <div>
                                            <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">Kart Sahibi</label>
                                            <input
                                                value={payment.cardHolder}
                                                onChange={e => setPayment(p => ({ ...p, cardHolder: e.target.value }))}
                                                placeholder="EMRE YILMAZ"
                                                className="w-full border border-sand/50 bg-cream/40 px-4 py-3 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/60 transition-colors uppercase"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">Kart Numarası</label>
                                            <input
                                                value={payment.cardNumber}
                                                onChange={e => setPayment(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                                                placeholder="0000 0000 0000 0000"
                                                className="w-full border border-sand/50 bg-cream/40 px-4 py-3 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/60 transition-colors tracking-widest"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">Son Kullanma</label>
                                                <input
                                                    value={payment.expiry}
                                                    onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                                                    placeholder="MM/YY"
                                                    className="w-full border border-sand/50 bg-cream/40 px-4 py-3 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/60 transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">CVV</label>
                                                <input
                                                    value={payment.cvv}
                                                    onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                                                    placeholder="•••"
                                                    type="password"
                                                    className="w-full border border-sand/50 bg-cream/40 px-4 py-3 text-sm text-dark placeholder:text-muted/50 focus:outline-none focus:border-brown/60 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <button onClick={() => setCurrentStep(0)} className="px-6 py-4 text-[0.75rem] uppercase tracking-[0.15em] border border-sand/50 text-muted hover:border-dark hover:text-dark transition-all">
                                            ← Geri
                                        </button>
                                        <button
                                            onClick={() => setCurrentStep(2)}
                                            disabled={!paymentFilled}
                                            className={`flex-1 py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all ${paymentFilled ? 'bg-dark text-cream hover:bg-accent' : 'bg-sand/40 text-muted cursor-not-allowed'}`}
                                        >
                                            Siparişi Onayla →
                                        </button>
                                    </div>

                                    <p className="mt-4 text-center text-[0.65rem] text-muted flex items-center justify-center gap-2">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                                        256-bit SSL şifrelemesi ile güvenli ödeme
                                    </p>
                                </motion.div>
                            )}

                            {/* Step 2 — Summary */}
                            {currentStep === 2 && (
                                <motion.div key="summary"
                                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                                    className="bg-white border border-sand/40 p-8"
                                >
                                    <h2 className="font-serif text-2xl font-light text-dark mb-8">Sipariş Özeti</h2>
                                    <div className="space-y-4 mb-8">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-sand/20 flex-shrink-0 overflow-hidden">
                                                    <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-dark">{item.name}</p>
                                                    <p className="text-[0.7rem] text-muted">Adet: {item.quantity}</p>
                                                </div>
                                                <p className="text-sm font-medium text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-sand/30 pt-6 mb-8 space-y-3">
                                        <div className="flex justify-between text-sm text-muted">
                                            <span>Ara Toplam</span><span>${cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-muted">
                                            <span>Kargo</span><span className="text-green-600 font-medium">Ücretsiz</span>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-dark border-t border-sand/30 pt-3">
                                            <span className="font-serif text-lg">Toplam</span>
                                            <span className="font-serif text-xl">${cartTotal.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="bg-cream/60 border border-sand/30 p-4 rounded-sm mb-8 text-sm text-muted">
                                        <p className="font-medium text-dark mb-1 text-[0.75rem] uppercase tracking-[0.1em]">Teslimat Adresi</p>
                                        <p>{shipping.firstName} {shipping.lastName} · {shipping.city} · {shipping.address}</p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setCurrentStep(1)} className="px-6 py-4 text-[0.75rem] uppercase tracking-[0.15em] border border-sand/50 text-muted hover:border-dark hover:text-dark transition-all">
                                            ← Geri
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={isPlacing}
                                            className={`flex-1 py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all flex items-center justify-center gap-3 ${isPlacing ? 'bg-sand/40 text-muted' : 'bg-dark text-cream hover:bg-accent'}`}
                                        >
                                            {isPlacing ? (
                                                <>
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    İşleniyor...
                                                </>
                                            ) : '✓ Siparişi Tamamla'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Cart summary sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-sand/40 p-6 sticky top-28">
                            <h3 className="font-serif text-xl font-light text-dark mb-6 pb-4 border-b border-sand/30">
                                Sepet ({cartItems.length} ürün)
                            </h3>
                            <div className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-3 text-sm">
                                        <div className="w-12 h-12 bg-sand/20 flex-shrink-0 overflow-hidden">
                                            <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-dark font-medium text-[0.8rem] line-clamp-1">{item.name}</p>
                                            <p className="text-muted text-[0.7rem]">x{item.quantity}</p>
                                        </div>
                                        <p className="text-dark font-medium text-[0.85rem] shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-sand/30 pt-4">
                                <div className="flex justify-between font-serif text-lg">
                                    <span>Toplam</span>
                                    <span className="text-brown">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
