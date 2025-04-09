import { useEffect, useState } from "react";
import "./productos.css";
import axios from "axios";

const Calculadora = () => {
  const [productos, setProductos] = useState();

  useEffect(() => {
    const URL_API = import.meta.env.VITE_API_URL;

    axios
      .get(`${URL_API}products`)
      .then((data) => {
        console.log(data);
        setProductos(data.data);
      })
      .catch((error) => {
        console.error("La peticion fallo", error);
      });
  }, []);

  if (!productos) return <span>Cargando...</span>;

  return (
    <>
      <h1 className="titulo">Productos flcode </h1>

      <ul className="lista-productos">
        {productos.map(({ id, image, title, description, price }) => (
          <li key={id} className="producto-card">
            <h2>{title}</h2>
            <img src={image} alt={title} />
            <p>{description}</p>
            <p className="precio">Precio: ${price}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Calculadora;
