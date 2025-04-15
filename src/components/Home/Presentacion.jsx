import { Link } from "react-router-dom";

const Precentacion = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          Bienvenido a <span className="highlight">FlCode</span>
        </h1>
        <p className="hero-subtitle">
          Descubre nuestra colección de productos y servicios de alta calidad
        </p>
        <div className="hero-buttons">
          <Link to="/productos" className="btn btn-primary">
            Ver Productos
          </Link>
          <Link to="/contacto" className="btn btn-secondary">
            Contactar
          </Link>
        </div>
      </div>
      <div className="hero-image">
        {/* Podemos usar un placeholder o un SVG decorativo */}
        <div className="hero-image-placeholder">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </section>
  );
};

export default Precentacion;
