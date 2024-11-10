import Navbar from "../../../navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const MyCart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();




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
            setError(err.message);
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
        } catch (err) {
            setError(err.message);
        }
    };

    const purchaseAlbum = async () => {
        setSuccessMessage('¡Compra realizada con éxito!'); 
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

          
        } catch (error) {
          console.error('Error al comprar álbum:', error);
        }
      };

    
    if (loading) {
        return <p>Cargando carrito...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }



    return (
        <>
            <Navbar showHome={true} showMyMusic={true} showLogout={true} showSettings={true} />
            <div className="cart">
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                {cart.albumsCart.length === 0 ? (
                    <p>No hay álbumes en el carrito.</p>
                ) : (
                    <div>
                        <h3>Carrito:</h3>
                        {cart.albumsCart.map((item) => (<div key={item.id}>
                            <p>{item.album.title}</p>
                            <p>{item.album.artist}</p>
                            <p>${item.album.price}</p>
                            <button type="button" onClick={() => deleteCart(item.id)}>Quitar del carrito</button>
                        </div>))}
                        <button type="button" onClick={purchaseAlbum}>Purchase</button>
                    </div>)}
                    
            </div>
        </>
    );
};

export default MyCart;