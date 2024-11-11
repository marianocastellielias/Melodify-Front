import AlbumsList from "../../../albumList/AlbumList";
import Navbar from "../../../navbar/Navbar";
import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";

const ArtistDashboard = () => {
  const { user } = useContext(AuthenticationContext);

    return(
    <div>
      <Navbar showLogout= {true} showMyCreations={true} showSettings = {true}/>
      <h3>¡Bienvenido {user.name}!</h3>  
      <AlbumsList />
    </div>
)
}

export default ArtistDashboard;