import { useState } from "react";
import "./Contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    asunto: "Consulta general",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    setSubmitted(true);
    setFormData({
      nombre: "",
      email: "",
      mensaje: "",
      asunto: "Consulta general",
    });
  };

  if (submitted) {
    return (
      <div className="contacto-container">
        <div className="contacto-success">
          <h2>¡Gracias por contactarnos!</h2>
          <p>
            Hemos recibido tu mensaje y te responderemos en un plazo de 24-48
            horas.
          </p>
          <button onClick={() => setSubmitted(false)}>
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contacto-container">
      <div className="contacto-header">
        <h1>Contacto</h1>
        <p>
          ¿Necesitas ayuda? Completa el formulario y nuestro equipo te
          responderá lo antes posible.
        </p>
      </div>

      <div className="contacto-content">
        <form onSubmit={handleSubmit} className="contacto-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo*</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Ej: juan@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto*</label>
            <select
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              required
            >
              <option value="Consulta general">Consulta general</option>
              <option value="Soporte técnico">Soporte técnico</option>
              <option value="Estado de pedido">Estado de pedido</option>
              <option value="Devoluciones">Devoluciones</option>
              <option value="Proveedores">Proveedores</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje*</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              placeholder="Describe tu consulta en detalle..."
              rows="5"
            />
          </div>

          <button type="submit" className="submit-btn">
            Enviar mensaje
          </button>
        </form>

        <div className="contacto-info">
          <h3>Otras formas de contacto</h3>
          <div className="info-item">
            <i className="fas fa-phone-alt"></i>
            <p>+1 (123) 456-7890</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>ventas@tienda.com</p>
          </div>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>Av. Principal 123, Ciudad, País</p>
          </div>
          <div className="info-item">
            <i className="fas fa-clock"></i>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
