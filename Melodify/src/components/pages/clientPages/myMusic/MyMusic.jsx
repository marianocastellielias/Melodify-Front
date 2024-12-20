import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Para navegar a otras rutas
import Navbar from "../../../navbar/Navbar";
import useNotifications from "../../../../hooks/useNotifications";

const MyMusic = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { notification, showNotification } = useNotifications();
  const navigate = useNavigate(); 

  const fetchMyAlbums = useCallback(async () => {
    const token = localStorage.getItem("bookchampions-token");

    try {
      const response = await fetch("https://localhost:7014/api/Cart/GetAllMyPurchases", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("No se pudieron cargar los álbumes");
      }

      const data = await response.json();
      setAlbums(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showNotification("Error al cargar los álbumes", "error");
    }
  }, [showNotification]);

  useEffect(() => {
    fetchMyAlbums();
  }, [fetchMyAlbums]);

  if (loading) {
    return <p>Cargando álbumes...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  const goToAlbumDetail = (albumId) => {
    navigate(`/client/my-music/album/${albumId}`); 
  };

  return (
    <div className="albums-container">
      <Navbar showHome={true} showMyCart={true} showLogout={true} showSettings={true} />
      {notification && (
        <div
          style={{
            color: notification.type === "success" ? "green" : "red",
            backgroundColor: notification.type === "success" ? "#d4edda" : "#f8d7da",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {notification.message}
        </div>
      )}
      {albums.length === 0 ? (
        <p>No hay álbumes comprados.</p>
      ) : (
        albums.map((purchase) =>
          purchase.albumsCart.map((albumCartItem) => (
            <div key={albumCartItem.album.id} className="album-item">
              <h3>{albumCartItem.album.title}</h3> 
              <button onClick={() => goToAlbumDetail(albumCartItem.album.id)}>
                Ver detalles
              </button>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default MyMusic;