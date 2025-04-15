const Caracteristicas = () => {
  return (
    <section className="features-section">
      <h2 className="section-title">Nuestras ventajas</h2>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <span className="icon">✨</span>
          </div>
          <h3>Calidad Premium</h3>
          <p>
            Todos nuestros productos están fabricados con los mejores materiales
            y estándares de calidad.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <span className="icon">🚚</span>
          </div>
          <h3>Envío Rápido</h3>
          <p>
            Entrega garantizada en menos de 48 horas a cualquier parte del país.
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
  );
};

export default Caracteristicas;
