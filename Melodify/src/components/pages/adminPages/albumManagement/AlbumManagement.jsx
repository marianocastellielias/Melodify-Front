import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import Navbar from "../../../navbar/Navbar";

const AlbumManagement = () => {
    const { user } = useContext(AuthenticationContext);
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState(null);

    const fetchAlbums = async () => {
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
            setError(err.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAlbums();
        }
    }, [user]);


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
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteAlbum = async (id) => {
        try {
            const response = await fetch(`https://localhost:7014/api/UserAdmin/Delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el álbum");
            }
            await fetchAlbums();
        } catch (err) {
            setError(err.message);
        }
    };


    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <>
        <Navbar showHome = {true} showUserManagement = {true} showLogout = {true} />
        <div className="albums-list">
            
            <h2>Álbumes</h2>
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
                            <button onClick={() => deleteAlbum(album.id)}>Eliminar álbum</button>
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
