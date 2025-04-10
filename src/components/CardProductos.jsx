import { useState } from "react";
import "../estilos/CardProductos.css";

const CardProductos = ({ title, image, description, price }) => {
  const [descripcion, setDescripcion] = useState(false);

  // Recortar la descripción si es demasiado larga
  const shortDescription =
    description && description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  return (
    <div className="producto-card">
      <div className="producto-imagen-container">
        <img
          src={image}
          alt={title}
          className="producto-imagen"
          loading="lazy"
        />
      </div>

      <div className="producto-content">
        <h2 className="producto-titulo">{title}</h2>

        <div className="producto-descripcion">
          {descripcion ? <p>{description}</p> : <p>{shortDescription}</p>}
          {description && description.length > 100 && (
            <button
              className="ver-mas-btn"
              onClick={() => setDescripcion(!descripcion)}
            >
              {descripcion ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>

        <div className="producto-footer">
          <p className="producto-precio">${price.toFixed(2)}</p>
          <button className="producto-btn">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default CardProductos;
