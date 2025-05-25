import React, { createContext, useState, useContext } from 'react';

// 1) Creo el contexto
const CartContext = createContext();

// 2) Proveedor
export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  // función para agregar 1 unidad de un mob
  function addToCart(mobId) {
    setCart(prev => ({
      ...prev,
      [mobId]: (prev[mobId] || 0) + 1
    }));
  }

  // limpiar el carrito
  function clearCart() {
    setCart({});
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3) Hook para consumir
export function useCart() {
  return useContext(CartContext);
}
