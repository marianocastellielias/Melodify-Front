
import { useNavigate } from "react-router-dom";
import AlbumsList from "../albumList/AlbumList";

const Dashboard = () => {
  const navigate = useNavigate();

  const goToRegisterHandler = () => {
    navigate("/register");
  };
  const goToLoginHandler = () => {
    navigate("/login");
  };

  return (
    <div>
      <p>¡Bienvenido a Melodify! Inicie sesión o cree una cuenta para comprar su álbum favorito.</p>
      <AlbumsList />
      <button type="button" onClick={goToLoginHandler}>Iniciar sesión</button>
      <button type="button" onClick={goToRegisterHandler}>Registrarse</button>
    </div>
  )
}

export default Dashboard;