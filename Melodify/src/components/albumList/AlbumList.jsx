import { useEffect, useState, useContext, useCallback } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import useNotifications from "../../hooks/useNotifications";

const AlbumsList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthenticationContext);
    const { notification, showNotification } = useNotifications();  


    const fetchAlbums = useCallback(async () => {
        try {
            const response = await fetch("https://localhost:7014/api/Albums");
            if (!response.ok) {
                throw new Error("No se pudieron cargar los álbumes");
            }
            const data = await response.json();
            setAlbums(data);
            setLoading(false);
        } catch (err) {
            showNotification(err.message, "error");  
            setLoading(false);
        }
    }, [showNotification]); 
    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]); 

    const addToCart = async (albumId) => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch("https://localhost:7014/api/Cart/albums/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ albumId, quantity: "1" })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al agregar al carrito");
            }

            showNotification("Álbum agregado al carrito exitosamente.", "success");  

        } catch (err) {
            showNotification(err.message, "error"); 
        }
    };

    if (loading) {
        return <p>Cargando álbumes...</p>;
    }

    return (
        <div className="albums-list">
            <h2>Álbumes Disponibles</h2>

           
            {notification && (
                <div style={{
                    color: notification.type === "success" ? "green" :
                           notification.type === "error" ? "red" :
                           notification.type === "warning" ? "orange" : "black",
                    backgroundColor: notification.type === "success" ? "#d4edda" :
                                     notification.type === "error" ? "#f8d7da" :
                                     notification.type === "warning" ? "#fff3cd" : "#e2e3e5",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    {notification.message}
                </div>
            )}

            <div className="albums-container">
                {albums.length === 0 ? (
                    <p>No hay álbumes disponibles.</p>
                ) : (
                    albums.map((album) => (
                        <div key={album.id} className="album-item">
                            <h3>{album.title}</h3>
                            <p>{album.artist}</p>
                            <p>{new Date(album.releaseDate).toLocaleDateString()}</p>
                            <p>{album.genre}</p>
                            <p>${album.price}</p>
                            <p>Canciones: {album.songs.map((song) => (
                                <div key={song.id}>
                                    <h6>{song.title}</h6>
                                    <h6>{song.duration.minute}:{song.duration.second}</h6>
                                    <hr />
                                </div>
                            ))}</p>
                            {user?.role === "Client" && (
                                <button onClick={() => addToCart(album.id)}>
                                    Añadir al carrito
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AlbumsList;