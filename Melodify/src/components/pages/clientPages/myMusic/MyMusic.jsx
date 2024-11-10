import { useState, useEffect } from "react";
import Navbar from "../../../navbar/Navbar";

const MyMusic = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyAlbums = async () => {
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
        }
    };

    useEffect(() => {
        fetchMyAlbums();
    }, []);

    if (loading) {
        return <p>Cargando álbumes...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="albums-container">
        <Navbar showHome = {true} showMyCart={true} showLogout={true} showSettings={true}/>
            {albums.length === 0 ? (
                <p>No hay álbumes comprados.</p>
            ) : (
                albums.map((purchase) =>
                    purchase.albumsCart.map((albumCartItem) => (
                        <div key={albumCartItem.album.id} className="album-item">
                            <h3>{albumCartItem.album.title}</h3>
                            <p>{albumCartItem.album.artist}</p>
                            <p>{new Date(albumCartItem.album.releaseDate).toLocaleDateString()}</p>
                            <p>{albumCartItem.album.genre}</p>
                            <p>
                                Canciones:
                                {albumCartItem.album.songs.length > 0 ? (
                                    albumCartItem.album.songs.map((song) => (
                                        <div key={song.id}>
                                            <h6>{song.title}</h6>
                                            <h6>{song.duration.minute}:{song.duration.second}</h6>
                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay canciones disponibles</p>
                                )}
                            </p>
                        </div>
                    ))
                )
            )}
        </div>
    );
}

export default MyMusic;