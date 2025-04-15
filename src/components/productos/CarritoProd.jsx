import {  Trash2, ArrowLeft } from "lucide-react";



const CarritoProductos = () => {

    return (
        <div className="carrito-productos">
        <div className="carrito-header">
          <span>Producto</span>
          <span>Precio</span>
          <span>Cantidad</span>
          <span>Total</span>
          <span></span>
        </div>
        
        <div className="productos-lista">
          {productos.map((p) => (
            <div className="producto-item" key={p.id}>
              <div className="producto-info">
                <div className="producto-imagen-container">
                  <img src={p.image} alt={p.title} className="producto-imagen" />
                </div>
                <div>
                  <h3 className="producto-titulo">{p.title}</h3>
                  <span className="producto-categoria">{p.category}</span>
                </div>
              </div>
              
              <div className="producto-precio">${p.price.toFixed(2)}</div>
              
              <div className="producto-cantidad">
                <button 
                  className="cantidad-btn" 
                  onClick={() => cambiarCantidad(p.id, -1)}
                >-</button>
                <span className="cantidad-valor">{cantidades[p.id] || 1}</span>
                <button 
                  className="cantidad-btn" 
                  onClick={() => cambiarCantidad(p.id, 1)}
                >+</button>
              </div>
              
              <div className="producto-total">
                ${((p.price) * (cantidades[p.id] || 1)).toFixed(2)}
              </div>
              
              <div className="producto-acciones">
                <button 
                  className="btn-eliminar" 
                  onClick={() => eliminarProducto(p.id)} 
                  title="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carrito-acciones">
          <div className="carrito-acciones-izquierda">
            <a href="/productos" className="carrito-btn carrito-btn-secundario">
              <ArrowLeft size={16} className="btn-icon" /> Seguir comprando
            </a>
            <button 
              className="carrito-btn carrito-btn-vaciar" 
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </div>
    )
}

export default CarritoProductos;