"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ICartItem {
    _id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface ICartContext {
    cart: ICartItem[];
    addToCart: (item: Omit<ICartItem, "quantity">) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ICartItem[]>([]);

    const addToCart = (item: Omit<ICartItem, "quantity">) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};