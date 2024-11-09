import Navbar from "../../../navbar/Navbar";
import { useEffect, useState } from "react";

const MyCreations = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAlbum, setNewAlbum] = useState({
        title: "",
        artist: "",
        genre: "",
        cover: "",
        stock: "",
        price: ""
    });
    const [newMusic, setNewMusic] = useState({
        title: "",
        minute: "",
        second: ""
    });
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const fetchMyAlbums = async () => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch("https://localhost:7014/api/Albums/my-albums", {
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

    const createAlbum = async () => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch("https://localhost:7014/api/Albums/create-album", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAlbum)
            });

            if (!response.ok) {
                throw new Error("Error al crear el álbum.");
            }

            setNewAlbum({ title: "", artist: "", genre: "", cover: "", stock: "", price: "" });
            await fetchMyAlbums();
        } catch (err) {
            setError(err.message);
        }
    };

    const updateAlbum = async (id) => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch(`https://localhost:7014/api/Albums/update-album/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedAlbum)
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el álbum.");
            }

            setSelectedAlbum(null);
            await fetchMyAlbums();
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteAlbum = async (id) => {
        try {
            const response = await fetch(`https://localhost:7014/Delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el álbum.");
            }
            await fetchMyAlbums();
        } catch (err) {
            setError(err.message);
        }
    };


    const addMusic = async (albumId) => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch(`https://localhost:7014/api/Music/Music/AddMusic/${albumId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newMusic)
            });

            if (!response.ok) {
                throw new Error("Error al agregar música.");
            }

            setNewMusic({ title: "", minute: "", second: "" });
            await fetchMyAlbums();
        } catch (err) {
            setError(err.message);
        }
    };


    const deleteMusic = async (musicId) => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch(`https://localhost:7014/api/Music/Music/DeleteMusic/${musicId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar la música.");
            }

            await fetchMyAlbums();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <p>Cargando álbumes...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    const handleEditClick = (album) => {
        setSelectedAlbum(album);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedAlbum((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Navbar showHome={true} showLogout={true}/>
            <form onSubmit={(e) => { e.preventDefault(); createAlbum(); }}>
                <input type="text" placeholder="Title" value={newAlbum.title} onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })} required />
                <input type="text" placeholder="Artist" value={newAlbum.artist} onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })} required />
                <input type="text" placeholder="Genre" value={newAlbum.genre} onChange={(e) => setNewAlbum({ ...newAlbum, genre: e.target.value })} />
                <input type="text" placeholder="Cover" value={newAlbum.cover} onChange={(e) => setNewAlbum({ ...newAlbum, cover: e.target.value })} />
                <input type="number" placeholder="Stock" value={newAlbum.stock} onChange={(e) => setNewAlbum({ ...newAlbum, stock: e.target.value })} required />
                <input type="number" placeholder="Price" value={newAlbum.price} onChange={(e) => setNewAlbum({ ...newAlbum, price: e.target.value })} required />
                <button type="submit">Crear Álbum</button>
            </form>

            <div className="albums-container">
                {albums.length === 0 ? (
                    <p>No hay álbumes registrados.</p>
                ) : (
                    albums.map((album) => (
                        <div key={album.id} className="album-item">
                            <h3>{album.title}</h3>
                            <p>{album.artist}</p>
                            <p>Estado: {album.state}</p>
                            <p>{new Date(album.releaseDate).toLocaleDateString()}</p>
                            <p>{album.genre}</p>
                            <p>${album.price}</p>
                            <p>Canciones: {album.songs.map((song)=>(
                                <div key={song.id}>
                                    <h6>{song.title}</h6>
                                    <h6>{song.duration.minute}:{song.duration.second}</h6>
                                    <button type="button" onClick={() => deleteMusic(song.id)}>Eliminar Canción</button>
                                    <hr></hr>
                                </div>))} </p>
                            <button onClick={() => deleteAlbum(album.id)}>Eliminar Álbum</button>
                            <button onClick={() => handleEditClick(album)}>Actualizar Álbum</button>

                            
                            <form onSubmit={(e) => { e.preventDefault(); addMusic(album.id); }}>
                                <h4>Agregar Música</h4>
                                <input type="text" placeholder="Título" value={newMusic.title} onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })} required />
                                <input type="number" placeholder="Minuto" value={newMusic.minute} onChange={(e) => setNewMusic({ ...newMusic, minute: e.target.value })} required />
                                <input type="number" placeholder="Segundo" value={newMusic.second} onChange={(e) => setNewMusic({ ...newMusic, second: e.target.value })} required />
                                <button type="submit">Agregar Música</button>
                            </form>

                            
                        </div>
                    ))
                )}
            </div>

            {selectedAlbum && (
                <form onSubmit={(e) => { e.preventDefault(); updateAlbum(selectedAlbum.id); }}>
                    <h3>Editando: {selectedAlbum.title}</h3>
                    <input type="text" name="title" placeholder="Title" value={selectedAlbum.title} onChange={handleInputChange} required />
                    <input type="text" name="artist" placeholder="Artist" value={selectedAlbum.artist} onChange={handleInputChange} required />
                    <input type="text" name="genre" placeholder="Genre" value={selectedAlbum.genre} onChange={handleInputChange} />
                    <input type="text" name="cover" placeholder="Cover" value={selectedAlbum.cover} onChange={handleInputChange} />
                    <input type="number" name="stock" placeholder="Stock" value={selectedAlbum.stock} onChange={handleInputChange} required />
                    <input type="number" name="price" placeholder="Price" value={selectedAlbum.price} onChange={handleInputChange} required />
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={() => setSelectedAlbum(null)}>Cancelar</button>
                </form>
            )}

        </>
    );
};

export default MyCreations;
