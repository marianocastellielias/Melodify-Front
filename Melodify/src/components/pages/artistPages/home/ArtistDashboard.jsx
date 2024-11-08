import { useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const ArtistDashboard = () => {
    const { handleLogout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        handleLogout();
        navigate("/login"); 
    };
    return(
    <div>
      <h1>Ha iniciado sesión Artista</h1>  
      <button onClick={logoutHandler}>Cerrar Sesión</button>
    </div>
)
}

export default ArtistDashboard;