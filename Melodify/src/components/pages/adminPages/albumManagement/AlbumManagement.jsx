import { useEffect, useState, useContext, useCallback } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import Navbar from "../../../navbar/Navbar";
import useNotifications from "../../../../hooks/useNotifications";

const AlbumManagement = () => {
    const { user } = useContext(AuthenticationContext);
    const [albums, setAlbums] = useState([]);
    const { notification, showNotification } = useNotifications(); 

  
    const fetchAlbums = useCallback(async () => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch("https://localhost:7014/api/UserAdmin/Albums", {
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
        } catch (err) {
            showNotification(err.message, "error"); 
        }
    }, [showNotification]); 

    useEffect(() => {
        if (user) {
            fetchAlbums();
        }
    }, [user, fetchAlbums]);

    const updateAlbumState = async (id, newState) => {
        try {
            const response = await fetch(`https://localhost:7014/api/UserAdmin/Update-Album-State/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                },
                body: JSON.stringify({ state: newState })
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el estado del álbum");
            }

            await fetchAlbums();
            showNotification("Estado del álbum actualizado con éxito", "success");
        } catch (err) {
            showNotification(err.message, "error"); 
        }
    };

    return (
        <>
            <Navbar showHome={true} showUserManagement={true} showLogout={true} />
            <div className="albums-list">
                <h2>Álbumes</h2>
                
                {notification && ( 
                    <div style={{
                        color: notification.type === "success" ? "green" : "red",
                        backgroundColor: notification.type === "success" ? "#d4edda" : "#f8d7da",
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
                    {albums.map((album) => (
                        <div key={album.id} className="album-item">
                            <h3>Estado: {album.state}</h3>
                            <h3>{album.title}</h3>
                            <p>{album.artist}</p>
                            <p>{new Date(album.releaseDate).toLocaleDateString()}</p>
                            <p>{album.genre}</p>
                            <p>${album.price}</p>
                            <p>
                                Canciones:
                                {album.songs.map((song) => (
                                    <div key={song.id}>
                                        <h6>id: {song.id}</h6>
                                        <h6>{song.title}</h6>
                                        <h6>
                                            {song.duration.minute}:{song.duration.second}
                                        </h6>
                                    </div>
                                ))}
                            </p>
                            <div>
                                <p>Cambiar estado del álbum:</p>
                                <button onClick={() => updateAlbumState(album.id, true)}>Aceptado</button>
                                <button onClick={() => updateAlbumState(album.id, false)}>Rechazado</button>
                                
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AlbumManagement;