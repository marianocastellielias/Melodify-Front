import Navbar from "../../../navbar/Navbar";
import AlbumsList from "../../../albumList/AlbumList";


const AdminDashboard = () => {



  return (
    <div>
      <Navbar showAlbumManagement = {true} showUserManagement = {true} showLogout = {true} />
      <h1>Ha iniciado sesión Admin</h1>
      <AlbumsList />
    </div>
  )
}

export default AdminDashboard;