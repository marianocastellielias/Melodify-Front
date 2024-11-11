import AlbumsList from "../albumList/AlbumList";
import Navbar from "../navbar/Navbar";

const Dashboard = () => {



  return (
    <div>
      <Navbar showLogin={true} showRegister={true} />
      <p>¡Bienvenido a Melodify! Inicie sesión o cree una cuenta para comprar un álbum.</p>
      <AlbumsList />
    </div>
  )
}

export default Dashboard;