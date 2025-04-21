import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const guardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(guardado);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (id) => {
    if (!carrito.includes(id)) {
      setCarrito([...carrito, id]);
    }
  };
  const removeFromCart = (id) => {
    const nuevoCarrito = carrito.filter((pid) => pid !== id);
    setCarrito(nuevoCarrito);
  };

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, removeFromCart, setCarrito }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
