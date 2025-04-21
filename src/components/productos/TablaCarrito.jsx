import "../../estilos/Carrito.css";

export const TablaCarrito = ({
  productos,
  actualizarCantidad,
  eliminarProducto,
  calcularTotal,
  pagar,
}) => {
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

      <button
        onClick={pagar}
        className="checkout-button"
        disabled={productos.length === 0}
      >
        Proceder al Pago (${calcularTotal()})
      </button>
    </div>
  );
};
