import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../estilos/Menu.css";
import { useCart } from "../contexto/CardContext";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { carrito } = useCart();

  // Detectar scroll para cambiar estilos del menú
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Toggle para el menú móvil
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="menu-container">
        <div className="logo">
          <NavLink to="/">FlCode</NavLink>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`menu-nav ${menuOpen ? "open" : ""}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/saludo"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Saludo
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/productos"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Productos
              </NavLink>
            </li>

            <li className="menu-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </NavLink>
            </li>
          </ul>

          <div className="cart-container">
            <NavLink
              to="/carrito"
              className={({ isActive }) =>
                `cart-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <div className="cart-button">
                <svg className="cart-icon" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                <span className="cart-text">Carrito</span>
                  <span className="cart-badge">{carrito.length}</span>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Menu;
