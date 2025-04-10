import { useState } from "react";
import "../estilos/CardProductos.css";

const CardProductos = ({ id, title, image, description, price, category }) => {
  const [descripcion, setDescripcion] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Recortar la descripción si es demasiado larga
  const shortDescription =
    description && description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    setIsInCart(true);

    // Obtener el carrito actual del localStorage
    const existingCart = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    const alreadyInCart = existingCart.some((item) => item.id === id);

    if (!alreadyInCart) {
      // Agregar producto al carrito
      const updatedCart = [
        ...existingCart,
        { id, title, image, description, price, category },
      ];

      // Guardar en localStorage
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
      console.log(updatedCart);
      console.log(`Producto ${id} - ${title} añadido al carrito`);
    } else {
      console.log(`Producto ${id} ya está en el carrito`);
    }

    // Mostrar "añadido" por 3 segundos
    setTimeout(() => {
      setIsInCart(false);
    }, 3000);
  };

  // Manejar errores de carga de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="producto-card">
      <div className="producto-imagen-container">
        {/* Placeholder para cuando la imagen falla */}
        {imageError ? (
          <div className="producto-imagen-fallback">
            <span>{title.charAt(0)}</span>
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="producto-imagen"
            loading="lazy"
            onError={handleImageError}
          />
        )}

        {category && <span className="producto-categoria">{category}</span>}
      </div>

      <div className="producto-content">
        <h2 className="producto-titulo" title={title}>
          {title}
        </h2>

        <div className="producto-descripcion">
          {descripcion ? <p>{description}</p> : <p>{shortDescription}</p>}
          {description && description.length > 100 && (
            <button
              className="ver-mas-btn"
              onClick={() => setDescripcion(!descripcion)}
              aria-expanded={descripcion}
            >
              {descripcion ? "Ver menos" : "Ver más"}
            </button>
          )}
        </div>

        <div className="producto-rating">
          <div className="estrellas">
            <span className="estrella">★</span>
            <span className="estrella">★</span>
            <span className="estrella">★</span>
            <span className="estrella">★</span>
            <span className="estrella muted">★</span>
          </div>
          <span className="review-count">12 reseñas</span>
        </div>

        <div className="producto-footer">
          <div className="producto-precio-container">
            <p className="producto-precio">${price.toFixed(2)}</p>
            {price > 50 && <span className="envio-gratis">Envío gratis</span>}
          </div>
          <button
            className={`producto-btn ${isInCart ? "added" : ""}`}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? (
              <span className="btn-added">✓ Añadido</span>
            ) : (
              <span className="btn-text">Añadir al carrito</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductos;
