import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../estilos/Carrito.css";

const Carrito = () => {
  const [productos, setProductos] = useState([]); 
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    (async () => {
      try {
        const ids = JSON.parse(localStorage.getItem("carrito")) || [];
        if (ids.length === 0) return;

        const productos = await Promise.all(
          ids.map(id => axios.get(`https://fakestoreapi.com/products/${id}`).then(res => res.data))
        );
        setProductos(productos);
      } catch (e) {
        console.error("Error al cargar productos:", e);
      }
    })();
  }, []);
 
  return (
    <div>
    <h1>Productos</h1>
    <ul>
      {productos.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  </div>
  );
};

export default Carrito;
