import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useOrders } from '../context/OrderContext';

const STATUS_STEPS = ['Hazırlanıyor', 'Kargoya Verildi', 'Teslim Edildi'];

const Orders = () => {
    const { orders } = useOrders();

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-cream pt-24 pb-16 flex flex-col items-center justify-center text-center px-6">
                <div className="text-6xl mb-6">📦</div>
                <h1 className="font-serif text-4xl font-light text-dark mb-4">Henüz Siparişiniz Yok</h1>
                <p className="text-muted font-light mb-10 max-w-sm">İlk siparişinizi vererek koleksiyonumuzu keşfedin.</p>
                <Link to="/#products" className="text-[0.8rem] uppercase tracking-[0.15em] bg-dark text-cream px-10 py-4 hover:bg-accent transition-all duration-300">
                    Alışverişe Başla
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-16">

                <div className="mb-12">
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-accent mb-2">Hesabım</p>
                    <h1 className="font-serif text-4xl font-light text-dark">Siparişlerim</h1>
                </div>

                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                            className="bg-white border border-sand/40"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-sand/30">
                                <div>
                                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Sipariş No</p>
                                    <p className="font-mono text-sm text-dark font-medium">{order.id}</p>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Tarih</p>
                                    <p className="text-sm text-dark">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</p>
                                </div>
                                <div>
                                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Toplam</p>
                                    <p className="font-serif text-xl text-brown">${order.totalAmount}</p>
                                </div>
                                <div>
                                    <p className="text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-1">Tahmini Teslimat</p>
                                    <p className="text-sm text-dark">{order.estimatedDelivery}</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="p-6 border-b border-sand/30">
                                <div className="flex items-center">
                                    {STATUS_STEPS.map((step, i) => (
                                        <React.Fragment key={i}>
                                            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.65rem] font-medium transition-all ${i <= (order.statusStep ?? 0)
                                                        ? 'bg-dark text-cream'
                                                        : 'bg-sand/30 text-muted'
                                                    }`}>
                                                    {i < (order.statusStep ?? 0) ? '✓' : i + 1}
                                                </div>
                                                <span className={`text-[0.55rem] tracking-[0.1em] uppercase text-center max-w-[60px] leading-tight ${i <= (order.statusStep ?? 0) ? 'text-dark font-medium' : 'text-muted'
                                                    }`}>{step}</span>
                                            </div>
                                            {i < STATUS_STEPS.length - 1 && (
                                                <div className={`flex-1 h-[2px] mx-2 mb-[18px] transition-all duration-700 ${i < (order.statusStep ?? 0) ? 'bg-dark' : 'bg-sand/30'
                                                    }`} />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <p className="text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-4">Ürünler</p>
                                <div className="flex flex-wrap gap-3">
                                    {order.items?.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-cream/60 border border-sand/30 px-3 py-2 rounded-sm">
                                            <div className="w-10 h-10 bg-sand/20 overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.images?.[0] || item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[0.75rem] text-dark font-medium line-clamp-1 max-w-[120px]">{item.name}</p>
                                                <p className="text-[0.65rem] text-muted">x{item.quantity} · ${item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
