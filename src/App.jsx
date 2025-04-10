import { BrowserRouter, Routes, Route } from "react-router";

import Productos from "./components/Productos";
import _404 from "./components/404";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
