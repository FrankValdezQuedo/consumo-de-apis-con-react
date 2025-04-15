import { useState } from "react";
import { Link } from "react-router-dom";
import "../../estilos/CardProdutos.css";

const CardProducto = ({ id, title, image, description, price, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const descripcionCorta =
    description.length > 90 ? description.slice(0, 90) + "..." : description;

  const addCarrito = () => {
    const carritoIds = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!carritoIds.includes(id)) {
      carritoIds.push(id);
      localStorage.setItem("carrito", JSON.stringify(carritoIds));
      alert("ID agregado al carrito 🛒");
      console.log(carritoIds);
    } else {
      alert("Este producto ya está en el carrito.");
    }
  };

  return (
    <div
      className={`card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/producto/${id}`} className="card-link">
        <div className="card-img-wrap">
          {!isImageLoaded && <div className="card-img-loading" />}
          <img
            src={image}
            alt={title}
            className={`card-img ${isImageLoaded ? "loaded" : ""}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="card-overlay">
            <button className="card-quickview">Vista rápida</button>
          </div>
        </div>
      </Link>

      <div className="card-content">
        <div className="card-category">{category}</div>
        <Link to={`/producto/${id}`} className="card-link">
          <h3 className="card-title">{title}</h3>
        </Link>
        <p className="card-desc">{descripcionCorta}</p>
        <p className="card-price">${price.toFixed(2)}</p>
        <div className="card-actions">
          <button className="card-btn card-btn-cart" onClick={addCarrito}>
            🛒 Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProducto;
