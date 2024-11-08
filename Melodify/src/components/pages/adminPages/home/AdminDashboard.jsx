import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    handleLogout();
    navigate("/login");
  };

  const goToUserManagementHandler = () => {
    navigate("/admin/user-management");
  };

  const goToAlbumManagementHandler = () => {
    navigate("/admin/album-management");
  };



  return (
    <div>
      <h1>Ha iniciado sesión Admin</h1>
      <button type="button" onClick={goToUserManagementHandler}>Gestión de Usuarios</button>
      <button type="button" onClick={goToAlbumManagementHandler}>Gestión de Álbumes</button>
      <button onClick={logoutHandler}>Cerrar Sesión</button>
    </div>
  )
}

export default AdminDashboard;