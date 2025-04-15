import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../estilos/Carrito.css";

const Carrito = () => {
  const [productos, setProductos] = useState([]); // Almacena los productos
  const [cargando, setCargando] = useState(true); // Controla estado de carga
  const [error, setError] = useState(null); // Maneja errores
  const [cantidades, setCantidades] = useState({}); // Almacena cantidades de cada producto

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("carrito")) || [];

    // Inicializar cantidades por defecto
    const cantidadesIniciales = {};
    ids.forEach((id) => {
      cantidadesIniciales[id] = 1;
    });
    setCantidades(cantidadesIniciales);

    const fetchProductos = async () => {
      if (ids.length === 0) {
        setCargando(false);
        return;
      }

      try {
        const respuestas = await Promise.all(
          ids.map((id) =>
            axios.get(`${import.meta.env.VITE_API_URL}products/${id}`)
          )
        );

        const data = respuestas.map((res) => res.data);
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No pudimos cargar los productos. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []); // Se ejecuta solo al montar el componente

  // Aumentar la cantidad de un producto
  const aumentarCantidad = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // Disminuir la cantidad de un producto
  const disminuirCantidad = (id) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  // Eliminar un producto del carrito
  const eliminarProducto = (id) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = carritoActual.filter((itemId) => itemId !== id);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));

    // Actualizar productos en el estado
    setProductos((prev) => prev.filter((prod) => prod.id !== id));

    // Eliminar la cantidad del producto
    const nuevasCantidades = { ...cantidades };
    delete nuevasCantidades[id];
    setCantidades(nuevasCantidades);
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify([]));
    setProductos([]);
    setCantidades({});
  };

  const total = productos.reduce(
    (total, producto) =>
      total + producto.price * (cantidades[producto.id] || 1),
    0
  );

  if (cargando) {
    return (
      <div className="carrito-container">
        <h1 className="carrito-titulo">Productos en el carrito</h1>
        <div className="carrito-skeleton">
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
          <div className="skeleton-item"></div>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de error
  if (error) {
    return (
      <div className="carrito-container">
        <div className="carrito-error">
          <span className="carrito-error-icon">⚠️</span>
          <h2>¡Ups! Algo salió mal</h2>
          <p>{error}</p>
          <button
            className="carrito-btn"
            onClick={() => window.location.reload()}
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1 className="carrito-titulo">Tu Carrito de Compras</h1>

      {productos.length === 0 ? (
        <div className="carrito-vacio">
          <div className="carrito-vacio-icon">🛒</div>
          <p>Tu carrito está vacío</p>
          <p className="carrito-vacio-mensaje">
            Parece que no has añadido productos a tu carrito de compras.
          </p>
          <Link to="/" className="carrito-btn carrito-btn-continuar">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="carrito-contenido">
          <div className="carrito-productos">
            <div className="carrito-header">
              <span className="carrito-header-producto">Producto</span>
              <span className="carrito-header-precio">Precio</span>
              <span className="carrito-header-cantidad">Cantidad</span>
              <span className="carrito-header-total">SubTotal</span>
              <span className="carrito-header-acciones"></span>
            </div>

            <div className="productos-lista">
              {productos.map((prod) => (
                <div key={prod.id} className="producto-item">
                  <div className="producto-imagen-container">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="producto-imagen"
                    />
                  </div>

                  <div className="producto-info">
                    <h3 className="producto-titulo">{prod.title}</h3>
                    <span className="producto-categoria">{prod.category}</span>
                  </div>

                  <div className="producto-precio">
                    ${prod.price.toFixed(2)}
                  </div>

                  <div className="producto-cantidad">
                    <button
                      className="cantidad-btn"
                      onClick={() => disminuirCantidad(prod.id)}
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="cantidad-valor">
                      {cantidades[prod.id] || 1}
                    </span>
                    <button
                      className="cantidad-btn"
                      onClick={() => aumentarCantidad(prod.id)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  <div className="producto-total">
                    ${(prod.price * (cantidades[prod.id] || 1)).toFixed(2)}
                  </div>

                  <div className="producto-acciones">
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(prod.id)}
                      aria-label="Eliminar producto"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-acciones">
              <div className="carrito-acciones-izquierda">
                <Link to="/" className="carrito-btn carrito-btn-secundario">
                  ← Continuar comprando
                </Link>
                <button
                  className="carrito-btn carrito-btn-vaciar"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>

          <div className="carrito-resumen">
            <h2 className="resumen-titulo">Resumen del pedido</h2>

            <div className="resumen-fila resumen-total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="carrito-btn carrito-btn-pagar">
              Proceder al pago
            </button>

            <div className="resumen-pagos">
              <p>Métodos de pago aceptados:</p>
              <div className="metodos-pago">
                <span className="metodo-pago">💳 Tarjeta</span>
                <span className="metodo-pago">🏦 Transferencia</span>
                <span className="metodo-pago">💰 PayPal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
