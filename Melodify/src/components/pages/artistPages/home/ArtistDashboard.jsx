import AlbumsList from "../../../albumList/AlbumList";
import Navbar from "../../../navbar/Navbar";

const ArtistDashboard = () => {

    return(
    <div>
      <Navbar showLogout= {true} showMyCreations={true} showSettings = {true}/>
      <h1>Ha iniciado sesión Artista</h1>  
      <AlbumsList />
    </div>
)
}

export default ArtistDashboard;