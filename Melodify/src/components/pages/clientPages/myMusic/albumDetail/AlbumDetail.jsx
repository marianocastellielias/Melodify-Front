import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Navbar from "../../../../navbar/Navbar";
import useNotifications from "../../../../../hooks/useNotifications";

const AlbumDetails = () => {
  const { albumId } = useParams(); 
  const [albumDetails, setAlbumDetails] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { notification, showNotification } = useNotifications();
  const navigate = useNavigate(); 


  const getAlbumDetails = useCallback((albumId) => {

    const albumFound = albums
      .flatMap((purchase) => purchase.albumsCart)  
      .find((albumCartItem) => albumCartItem.album.id === parseInt(albumId)); 

    return albumFound ? albumFound.album : null; 
  }, [albums]);


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


  useEffect(() => {
    if (albums.length > 0 && albumId) {
      const album = getAlbumDetails(albumId);
      setAlbumDetails(album); 
    }
  }, [albums, albumId, getAlbumDetails]); 


  if (loading) {
    return <p>Cargando detalles del álbum...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  if (!albumDetails) {
    return <p>Álbum no encontrado.</p>;
  }

  const goBackToAlbums = () => {
    navigate("/client/my-music");
  };

  return (
    <div className="album-details-container">
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
      <h2>{albumDetails.title}</h2>
      <p><strong>Artista:</strong> {albumDetails.artist}</p>
      <p><strong>Género:</strong> {albumDetails.genre}</p>
      <p><strong>Fecha de lanzamiento:</strong> {new Date(albumDetails.releaseDate).toLocaleDateString()}</p>
      <div>
        <h3>Canciones:</h3>
        {albumDetails.songs.length > 0 ? (
          albumDetails.songs.map((song) => (
            <div key={song.id}>
              <h4>{song.title}</h4>
              <p>Duración: {song.duration.minute}:{song.duration.second}</p>
            </div>
          ))
        ) : (
          <p>No hay canciones disponibles</p>
        )}
      </div>
      <button onClick={goBackToAlbums}>Volver a la lista de álbumes</button> 
    </div>
  );
};

export default AlbumDetails;
