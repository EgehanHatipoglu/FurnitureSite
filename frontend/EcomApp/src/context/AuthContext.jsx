import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('antigravity_token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If we have a token but no user, we could optionally hit a /me endpoint
        // For now, we will just rely on the login/register response setting the user
        if (token) {
            // Restore basic user state if possible (e.g. from local storage)
            const savedUser = localStorage.getItem('antigravity_user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        }
        setLoading(false);
    }, [token]);

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://localhost:5001/api/auth/register', { name, email, password });
            const { token: newToken, user: newUser } = response.data;

            localStorage.setItem('antigravity_token', newToken);
            localStorage.setItem('antigravity_user', JSON.stringify(newUser));

            setToken(newToken);
            setUser(newUser);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Registration failed' };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
            const { token: newToken, user: loggedUser } = response.data;

            localStorage.setItem('antigravity_token', newToken);
            localStorage.setItem('antigravity_user', JSON.stringify(loggedUser));

            setToken(newToken);
            setUser(loggedUser);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('antigravity_token');
        localStorage.removeItem('antigravity_user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
