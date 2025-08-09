import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({
    username: "prueba@gmail.com",
    password: "1234",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validación básica
    if (!user.username || !user.password) {
      setError("Por favor, introduzca el nombre de usuario y la contraseña");
      setLoading(false);
      return;
    }

    // Validación contra usuario fijo
    if (user.username === "prueba@gmail.com" && user.password === "1234") {
      localStorage.setItem("token", "token_de_prueba_123");
      navigate("/");
    } else {
      setError("Credenciales inválidas");
    }

    setLoading(false);
  };

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Por favor introduce tus credenciales</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              id="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Ingrese su email"
              value={user.username}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Ingrese su contraseña"
              value={user.password}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
          <a href="/forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
