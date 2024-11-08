import Navbar from "../../../navbar/Navbar";

const AdminDashboard = () => {



  return (
    <div>
      <Navbar showAlbumManagement = {true} showUserManagement = {true} showLogout = {true} />
      <h1>Ha iniciado sesión Admin</h1>
    </div>
  )
}

export default AdminDashboard;