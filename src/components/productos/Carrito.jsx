import { useEffect, useState } from "react";
import axios from "axios";
import "../../estilos/Carrito.css";
import { ShoppingCart, Trash2, ArrowLeft, RefreshCw, ShoppingBag } from "lucide-react";
import { useCart } from "../contexto/CardContext";
import CarritoProductos from "./CarritoProd";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cantidades, setCantidades] = useState({});
  const [error, setError] = useState(null);
  const [codigoDescuento, setCodigoDescuento] = useState("");
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const {removeFromCart } = useCart();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const ids = JSON.parse(localStorage.getItem("carrito")) || [];
      if (ids.length === 0) {
        setProductos([]);
        setCargando(false);
        return;
      }

      const productosData = await Promise.all(
        ids.map(id =>
          axios.get(`https://fakestoreapi.com/products/${id}`).then(res => res.data)
        )
      );

      // Inicializar cantidades
      const cantidadesIniciales = {};
      productosData.forEach(p => {
        cantidadesIniciales[p.id] = 1;
      });
      
      setCantidades(cantidadesIniciales);
      setProductos(productosData);
    } catch (e) {
      console.error("Error al cargar productos:", e);
      setError("No pudimos cargar tus productos. Por favor, intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((p) => p.id !== id);
    setProductos(nuevosProductos);
    
    // Actualizar localStorage
    localStorage.setItem("carrito", JSON.stringify(nuevosProductos.map(p => p.id)));
    
    // Actualizar cantidades
    const nuevasCantidades = { ...cantidades };
    delete nuevasCantidades[id];
    setCantidades(nuevasCantidades);
    removeFromCart(id);
  };

  const cambiarCantidad = (id, cambio) => {
    const nuevasCantidades = { ...cantidades };
    const nuevaCantidad = Math.max(1, (nuevasCantidades[id] || 1) + cambio);
    nuevasCantidades[id] = nuevaCantidad;
    setCantidades(nuevasCantidades);
  };

  const vaciarCarrito = () => {
    setProductos([]);
    setCantidades({});
    localStorage.setItem("carrito", JSON.stringify([]));
  };

  const aplicarDescuento = () => {
    if (codigoDescuento.toLowerCase() === "descuento20") {
      setDescuentoAplicado(0.2); // 20% de descuento
    } else {
      alert("Código de descuento inválido");
    }
  };

  const calcularSubtotal = () => {
    return productos.reduce((total, p) => {
      const cantidad = cantidades[p.id] || 1;
      return total + (p.price * cantidad);
    }, 0);
  };

  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    const descuento = subtotal * descuentoAplicado;
    const envio = subtotal > 50 ? 0 : 5;
    return subtotal - descuento + envio;
  };

  if (cargando) {
    return (
      <div className="carrito-container">
        <div className="carrito-skeleton">
          <div className="skeleton-titulo"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-item"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carrito-container">
        <div className="carrito-error">
          <div className="carrito-error-icon">❌</div>
          <h2>¡Ups! Algo salió mal</h2>
          <p>{error}</p>
          <button className="carrito-btn carrito-btn-continuar" onClick={cargarProductos}>
            <RefreshCw size={16} className="btn-icon" /> Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="carrito-container">
        <h1 className="carrito-titulo">Tu Carrito de Compras</h1>
        <div className="carrito-vacio">
          <div className="carrito-vacio-icon">
            <ShoppingCart size={64} />
          </div>
          <p>Tu carrito está vacío</p>
          <p className="carrito-vacio-mensaje">¡Agrega productos para comenzar tu compra!</p>
          <a href="/productos" className="carrito-btn carrito-btn-continuar">
            <ShoppingBag size={16} className="btn-icon" /> Ir a Productos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h1 className="carrito-titulo">Tu Carrito de Compras</h1>
      
      <div className="carrito-contenido">
       
        
        <div className="carrito-resumen">
          <h2 className="resumen-titulo">Resumen del pedido</h2>
          <CarritoProductos/>
          <div className="resumen-fila">
            <span>Subtotal</span>
            <span>${calcularSubtotal().toFixed(2)}</span>
          </div>
          
          {descuentoAplicado > 0 && (
            <div className="resumen-fila resumen-descuento">
              <span>Descuento (20%)</span>
              <span>-${(calcularSubtotal() * descuentoAplicado).toFixed(2)}</span>
            </div>
          )}
          
          <div className="resumen-fila resumen-envio">
            <span>Envío</span>
            <span>
              {calcularSubtotal() > 50 ? (
                "Gratis"
              ) : (
                "$5.00"
              )}
            </span>
          </div>
          
          <div className="resumen-fila resumen-total">
            <span>Total</span>
            <span>${calcularTotal().toFixed(2)}</span>
          </div>
          
          <div className="resumen-descuento-input">
            <input 
              type="text" 
              placeholder="Código de descuento" 
              value={codigoDescuento}
              onChange={(e) => setCodigoDescuento(e.target.value)}
            />
            <button 
              className="carrito-btn-descuento"
              onClick={aplicarDescuento}
              disabled={!codigoDescuento}
            >
              Aplicar
            </button>
          </div>
          
          <p className="resumen-nota">* Prueba el código "DESCUENTO20" para obtener un 20% de descuento</p>
          
          <button className="carrito-btn-pagar">
            Proceder al pago
          </button>

        </div>
      </div>
    </div>
  );
};

export default Carrito;