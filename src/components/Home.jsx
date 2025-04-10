import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../estilos/Home.css";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Efecto de animación al cargar el componente
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`home-container ${isLoaded ? "loaded" : ""}`}>
      {/* Sección Hero */}
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

      {/* Sección de Características */}
      <section className="features-section">
        <h2 className="section-title">Nuestras ventajas</h2>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon">✨</span>
            </div>
            <h3>Calidad Premium</h3>
            <p>
              Todos nuestros productos están fabricados con los mejores
              materiales y estándares de calidad.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon">🚚</span>
            </div>
            <h3>Envío Rápido</h3>
            <p>
              Entrega garantizada en menos de 48 horas a cualquier parte del
              país.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon">💯</span>
            </div>
            <h3>Garantía Total</h3>
            <p>
              Todos nuestros productos cuentan con garantía de satisfacción o te
              devolvemos tu dinero.
            </p>
          </div>
        </div>
      </section>

      {/* Sección CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Explora nuestra colección y encuentra lo que estás buscando.</p>
          <Link to="/productos" className="btn btn-cta">
            Ver catálogo completo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
