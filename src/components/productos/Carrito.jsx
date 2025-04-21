import { useCarrito } from "./service/useCarrito";
import { TablaCarrito } from "./TablaCarrito";
import "../../estilos/Carrito.css";

const Carrito = () => {
  const {
    productos,
    cargando,
    error,
    carritoVacio,
    actualizarCantidad,
    eliminarProducto,
    calcularTotal,
    pagar,
  } = useCarrito();

  if (cargando) return <div className="loading">Cargando tu carrito...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (carritoVacio)
    return <div className="empty-cart">Tu carrito está vacío</div>;

  return (
    <TablaCarrito
      productos={productos}
      actualizarCantidad={actualizarCantidad}
      eliminarProducto={eliminarProducto}
      calcularTotal={calcularTotal}
      pagar={pagar}
    />
  );
};

export default Carrito;
