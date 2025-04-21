import Menu from "./components/menu/Menu";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  if (localStorage.getItem("token") === null) return <Navigate to="/login" />;

  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}

export default App;
