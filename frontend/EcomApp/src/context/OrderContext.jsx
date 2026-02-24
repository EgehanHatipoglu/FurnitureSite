import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const placeOrder = async (orderData) => {
        const newOrder = {
            id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
            createdAt: new Date().toISOString(),
            statusStep: 0,
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
            ...orderData,
            items: orderData.cartItems, // Map cartItems to items
        };

        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
