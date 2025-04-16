import { useEffect, useState } from "react";
import axios from "axios";
import CardProducto from "./CardProductos";
import Skeleton from "./Skeleton";
import "../../estilos/Productos.css";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products`
        );
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No pudimos cargar los productos. Intenta más tarde.");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const categorias = ["todos", ...new Set(productos.map((p) => p.category))];
  const productosFiltrados =
    filtro === "todos"
      ? productos
      : productos.filter((p) => p.category === filtro);

  if (cargando)
    return (
      <div className="productos-container">
        <h2 className="titulo">Cargando productos...</h2>
        <div className="productos-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </div>
    );

  if (error) return <p className="error">{error}</p>;

  return (
    <div className="productos-container">
      <h2 className="titulo">Nuestros Productos</h2>
      <div className="productos-filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`filtro-btn ${filtro === cat ? "activo" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="productos-grid">
        {productosFiltrados.map((prod) => (
          <CardProducto key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
