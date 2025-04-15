import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../estilos/Home.css";
import Presentacion from "./Presentacion";
import Caracteristicas from "./Caracteristicas";

const Home = () => {
  return (
    <div className="home-container">
      <Presentacion />
      <Caracteristicas />
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
