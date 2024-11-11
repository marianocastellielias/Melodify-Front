import Navbar from "../../../navbar/Navbar";
import AlbumsList from "../../../albumList/AlbumList";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthenticationContext);


  return (
    <div>
      <Navbar showAlbumManagement = {true} showUserManagement = {true} showLogout = {true} />
      <h3>¡Bienvenido {user.name}!</h3>  
      <AlbumsList />
    </div>
  )
}

export default AdminDashboard;