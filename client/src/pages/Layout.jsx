import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1>Layout</h1>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
