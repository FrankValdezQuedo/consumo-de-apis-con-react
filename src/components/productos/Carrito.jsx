import { useEffect, useState } from "react";
import axios from "axios";
import "../../estilos/Carrito.css";
import { useCart } from "../contexto/CardContext";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [carritoVacio, setCarritoVacio] = useState(false);
  const { removeFromCart } = useCart();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      // Obtener solo IDs del carrito
      const idsCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

      if (idsCarrito.length === 0) {
        setProductos([]);
        setCarritoVacio(true);
        setCargando(false);
        return;
      }

      // Cargar productos y agregar cantidad inicial (1)
      const productosData = await Promise.all(
        idsCarrito.map((id) =>
          axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .then((res) => ({
              ...res.data,
              cantidad: 1, // Cantidad inicial por defecto
            }))
            .catch(() => null)
        )
      );

      const productosValidos = productosData.filter(
        (producto) => producto !== null
      );

      if (productosValidos.length === 0) {
        setError("No se pudieron cargar los productos del carrito.");
      } else {
        setProductos(productosValidos);
      }
    } catch (e) {
      console.error("Error al cargar productos:", e);
      setError("No pudimos cargar tus productos. Por favor intenta más tarde.");
    } finally {
      setCargando(false);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id ? { ...producto, cantidad: nuevaCantidad } : producto
      )
    );
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);

    // Actualizar localStorage con solo los IDs restantes
    const nuevosIds = nuevosProductos.map((producto) => producto.id);
    localStorage.setItem("carrito", JSON.stringify(nuevosIds));
    removeFromCart(id);

    if (nuevosProductos.length === 0) {
      setCarritoVacio(true);
    }
  };

  const calcularTotal = () => {
    return productos
      .reduce(
        (total, producto) => total + producto.price * producto.cantidad,
        0
      )
      .toFixed(2);
  };

  if (cargando) return <div className="loading">Cargando tu carrito...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (carritoVacio)
    return <div className="empty-cart">Tu carrito está vacío</div>;

  return (
    <div className="cart-container">
      <h2>Tu Carrito de Compras</h2>

      <div className="cart-table-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="product-row">
                <td className="product-image">
                  <img src={producto.image} alt={producto.title} />
                </td>
                <td className="product-title">{producto.title}</td>
                <td className="product-price">${producto.price.toFixed(2)}</td>
                <td className="product-quantity">
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad - 1)
                      }
                      className="quantity-button"
                    >
                      -
                    </button>
                    <span className="quantity-value">{producto.cantidad}</span>
                    <button
                      onClick={() =>
                        actualizarCantidad(producto.id, producto.cantidad + 1)
                      }
                      className="quantity-button"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="product-subtotal">
                  ${(producto.price * producto.cantidad).toFixed(2)}
                </td>
                <td className="product-actions">
                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="remove-button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="total-label">
                Total:
              </td>
              <td colSpan="2" className="total-amount">
                ${calcularTotal()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button className="checkout-button">Proceder al Pago</button>
    </div>
  );
};

export default Carrito;
