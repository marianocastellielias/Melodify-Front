import { useEffect, useState } from "react";

const AlbumsList = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    if (loading) {
        return <p>Cargando álbumes...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="albums-list">
            <h2>Álbumes Disponibles</h2>
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
                            <p>Canciones: {album.songs.map((song)=>(
                                <div key={song.id}>
                                    <h6>{song.title}</h6>
                                    <h6>{song.duration.minute}:{song.duration.second}</h6>
                                    <hr></hr>
                                </div>
                                ))}
                            </p>
                            
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AlbumsList;
