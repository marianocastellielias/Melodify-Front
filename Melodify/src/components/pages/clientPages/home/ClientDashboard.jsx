import AlbumsList from "../../../albumList/AlbumList";
import Navbar from "../../../navbar/Navbar";

const ClientDashboard = () => {

    return(
    <div>
      <Navbar showLogout= {true} showMyCart = {true} showMyMusic={true} showSettings={true}/>
      <h1>Ha iniciado sesión Cliente</h1>  
      <AlbumsList />
    </div>
)
}

export default ClientDashboard;