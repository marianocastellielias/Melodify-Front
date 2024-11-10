import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";

const AlbumsList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const { user } = useContext(AuthenticationContext);

    const fetchAlbums = async () => {
        try {
            const response = await fetch("https://localhost:7014/api/Albums");
            if (!response.ok) {
                throw new Error("No se pudieron cargar los álbumes");
            }
            const data = await response.json();
            setAlbums(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setTimeout(() => setError(null), 2000);  
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

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

           
            setSuccessMessage("Álbum agregado al carrito exitosamente.");
            setTimeout(() => setSuccessMessage(null), 2000); 

        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 2000);  
        }
    };

    if (loading) {
        return <p>Cargando álbumes...</p>;
    }

    return (
        <div className="albums-list">
            <h2>Álbumes Disponibles</h2>


            {error && (
                <div style={{
                    color: "red",
                    backgroundColor: "#f8d7da",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    {error}
                </div>
            )}


            {successMessage && (
                <div style={{
                    color: "green",
                    backgroundColor: "#d4edda",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    textAlign: "center",
                    fontWeight: "bold"
                }}>
                    {successMessage}
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
                                <button 
                                    onClick={() => addToCart(album.id)} 
                                >
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