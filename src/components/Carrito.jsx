import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../estilos/Carrito.css";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setProductos(carritoGuardado);
  }, []);

  // Calcular el total cuando cambian los productos
  useEffect(() => {
    const nuevoTotal = productos.reduce(
      (acc, producto) => acc + producto.price * producto.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, [productos]);

  // Función para actualizar la cantidad
  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const productosActualizados = productos.map((producto) =>
      producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
    );

    setProductos(productosActualizados);
    localStorage.setItem("carrito", JSON.stringify(productosActualizados));
  };

  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    const productosActualizados = productos.filter(
      (producto) => producto.id !== id
    );

    setProductos(productosActualizados);
    localStorage.setItem("carrito", JSON.stringify(productosActualizados));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setProductos([]);
    localStorage.setItem("carrito", JSON.stringify([]));
  };

  return (
    <div className="carrito-container">
      <div className="carrito-header">
        <h1>Tu Carrito de Compras</h1>
        {productos.length > 0 && (
          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
        )}
      </div>

      {productos.length === 0 ? (
        <div className="carrito-vacio">
          <svg
            className="carrito-vacio-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
          <p>Tu carrito está vacío</p>
          <Link to="/productos" className="btn-seguir-comprando">
            Seguir Comprando
          </Link>
        </div>
      ) : (
        <div className="carrito-contenido">
          <div className="carrito-items">
            <div className="carrito-cabecera">
              <span className="cabecera-producto">Producto</span>
              <span className="cabecera-precio">Precio</span>
              <span className="cabecera-cantidad">Cantidad</span>
              <span className="cabecera-subtotal">Subtotal</span>
              <span className="cabecera-actions"></span>
            </div>

            {productos.map((producto) => (
              <div className="carrito-item" key={producto.id}>
                <div className="item-producto">
                  <img
                    src={producto.image}
                    alt={producto.title}
                    className="item-imagen"
                  />
                  <span className="item-nombre">{producto.title}</span>
                </div>
                <span className="item-precio">
                  ${producto.price?.toFixed(2)}
                </span>
                <div className="item-cantidad">
                  <button
                    className="btn-cantidad"
                    onClick={() =>
                      actualizarCantidad(producto.id, producto.cantidad - 1)
                    }
                    disabled={producto.cantidad <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={producto.cantidad || 1}
                    onChange={(e) =>
                      actualizarCantidad(producto.id, parseInt(e.target.value))
                    }
                    min="1"
                    className="input-cantidad"
                  />
                  <button
                    className="btn-cantidad"
                    onClick={() =>
                      actualizarCantidad(
                        producto.id,
                        (producto.cantidad || 1) + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <span className="item-subtotal">
                  $
                  {((producto.price || 0) * (producto.cantidad || 1)).toFixed(
                    2
                  )}
                </span>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarProducto(producto.id)}
                  aria-label="Eliminar producto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="resumen-contenido">
              <h2>Resumen de Compra</h2>
              <div className="resumen-item">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="resumen-item">
                <span>Envío</span>
                <span>Calculado en el checkout</span>
              </div>
              <div className="resumen-item total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="btn-checkout">Proceder al Pago</button>
              <Link to="/productos" className="btn-seguir-comprando">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
