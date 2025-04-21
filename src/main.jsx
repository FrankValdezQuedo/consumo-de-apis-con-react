import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import App from "./App.jsx";
import "./estilos/main.css";
import Productos from "./components/productos/Productos.jsx";
import _404 from "./components/404";
import Home from "./components/Home/Home.jsx";
import Carrito from "./components/productos/Carrito.jsx";
import { CartProvider } from "./components/contexto/CardContext.jsx";
import Login from "./components/login/Login.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Productos />} />
            <Route path="carrito" element={<Carrito />} />
          </Route>
          <Route path="*" element={<_404 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </>
);
