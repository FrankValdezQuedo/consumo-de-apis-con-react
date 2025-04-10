import Menu from "./components/menu/Menu";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default App;
