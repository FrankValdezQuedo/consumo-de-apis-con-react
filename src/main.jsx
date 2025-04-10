import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import App from "./App.jsx";
import "./estilos/main.css";
import Productos from "./components/Productos";
import _404 from "./components/404";
import Home from "./components/Home.jsx";
import Carrito from "./components/Carrito.jsx";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Productos />} />
          <Route path="carrito" element={<Carrito />} />
        </Route>
        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  </>
);
