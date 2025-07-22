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

  // actualizar cantidad
  function updateQty(mobId, qty) {
    if (qty <= 0) {
      // eliminar del carrito si qty 0 o menor
      setCart(prev => {
        const copy = { ...prev };
        delete copy[mobId];
        return copy;
      });
    } else {
      setCart(prev => ({
        ...prev,
        [mobId]: qty
      }));
    }
  }

  // limpiar el carrito
  function clearCart() {
    setCart({});
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3) Hook para consumir
export function useCart() {
  return useContext(CartContext);
}
