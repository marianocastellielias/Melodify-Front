import Navbar from "../../../navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotifications from "../../../../hooks/useNotifications";


const MyCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { notification, showNotification } = useNotifications(); 


    const fetchCart = async () => {
        const token = localStorage.getItem("bookchampions-token");
        try {
            const response = await fetch("https://localhost:7014/api/Cart/GetCart", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error("No se pudo cargar el carrito");
            }
            const data = await response.json();
            setCart(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);


    const deleteCart = async (id) => {
        try {
            const response = await fetch(`https://localhost:7014/api/Cart/albums/remove/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el álbum.");
            }
            await fetchCart();
            showNotification("Álbum eliminado del carrito.", "success"); 
        } catch (err) {
            showNotification("Error al eliminar el álbum.", "error"); 
        }
    };


    const purchaseAlbum = async () => {
        showNotification("Compra realizada con éxito.", "success"); 
        setTimeout(() => {
            navigate('/client-dashboard');
        }, 2000);
        
        try {
            const response = await fetch('https://localhost:7014/api/Cart/albums/purchase', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                },
                body: JSON.stringify({
                    paymentMethod: 1,
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la compra del álbum');
            }

            const result = await response.json();
            console.log('Compra exitosa:', result);
            showNotification("Compra realizada con éxito.", "success"); 

        } catch (error) {
            console.error('Error al comprar álbum:', error);
        }
    };


    if (loading) {
        return <p>Cargando carrito...</p>;
    }

    return (
        <>
            <Navbar showHome={true} showMyMusic={true} showLogout={true} showSettings={true} />
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
            <div className="cart">
                {cart.albumsCart.length === 0 ? (
                    <p>No hay álbumes en el carrito.</p>
                ) : (
                    <div>
                        <h3>Carrito:</h3>
                        {cart.albumsCart.map((item) => (
                            <div key={item.id}>
                                <p>{item.album.title}</p>
                                <p>{item.album.artist}</p>
                                <p>${item.album.price}</p>
                                <button type="button" onClick={() => deleteCart(item.id)}>Quitar del carrito</button>
                            </div>
                        ))}
                        <button type="button" onClick={purchaseAlbum}>Comprar</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyCart;