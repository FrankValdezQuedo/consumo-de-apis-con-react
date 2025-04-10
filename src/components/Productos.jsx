import { useEffect, useState } from "react";
import axios from "axios";
import CardProductos from "./CardProductos";
import "../estilos/Productos.css"; // Asumiendo que el archivo CSS estará en la misma carpeta

const Productos = () => {
  const [productos, setProductos] = useState();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const URL_API = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${URL_API}products`);
        setProductos(response.data);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setError(
          "No pudimos cargar los productos. Por favor, intenta más tarde."
        );
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="productos-container">
      <header className="productos-header">
        <p className="productos-subtitulo">
          Descubre nuestra colección de productos
        </p>
      </header>

      <div className="productos-grid">
        {productos.map(({ id, image, title, description, price, category }) => (
          <CardProductos
            key={id}
            id={id}
            image={image}
            title={title}
            description={description}
            price={price}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default Productos;
