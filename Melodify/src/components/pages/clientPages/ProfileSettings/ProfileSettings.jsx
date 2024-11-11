import Navbar from "../../../navbar/Navbar";
import useNotifications from "../../../../hooks/useNotifications";
import { useState } from "react";


const ProfileSettings = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [profileUpdate, setProfileUpdate] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    const { showNotification } = useNotifications(); 
    const updateUser = async () => {
        setLoading(true);
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch(`https://localhost:7014/api/User/Update-User-Data`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profileUpdate)
            });

            if (!response.ok) {
                throw new Error("Error al modificar el usuario.");
            }

            setLoading(false);
            setSuccessMessage("Datos actualizados exitosamente.");
            showNotification('Datos actualizados exitosamente', "success"); 
            setTimeout(() => setSuccessMessage(null), 2000);

        } catch (err) {
            setError(err.message);
            setLoading(false);
            showNotification('Error al modificar los datos del usuario', "error"); 
            setTimeout(() => setError(null), 2000);
        }
    };

    const changeNameHandler = (event) => {
        setProfileUpdate({ ...profileUpdate, name: event.target.value });
    };

    const changeMailHandler = (event) => {
        setProfileUpdate({ ...profileUpdate, email: event.target.value });
    };

    const changeAddressHandler = (event) => {
        setProfileUpdate({ ...profileUpdate, address: event.target.value });
    };

    const changePhoneHandler = (event) => {
        setProfileUpdate({ ...profileUpdate, phone: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        updateUser();
        setProfileUpdate({ name: "", email: "", address: "", phone: "" });
    };

    if (loading) {
        return <p>Cargando modificaciones...</p>;
    }

    return (
        <>
            <Navbar showHome={true} showLogout={true} />
            {error && (
                <div
                    style={{
                        color: "red",
                        backgroundColor: "#f8d7da",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}
                >
                    {error}
                </div>
            )}

            {successMessage && (
                <div
                    style={{
                        color: "green",
                        backgroundColor: "#d4edda",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        textAlign: "center",
                        fontWeight: "bold"
                    }}
                >
                    {successMessage}
                </div>
            )}
            <form onSubmit={submitHandler}>
                <label>Modificar datos de usuario</label>
                <input type="text" placeholder="name" onChange={changeNameHandler} required />
                <input type="mail" placeholder="mail" onChange={changeMailHandler} required />
                <input type="text" placeholder="address" onChange={changeAddressHandler} required />
                <input type="number" placeholder="phone" onChange={changePhoneHandler} required />
                <button type="submit">Modificar Usuario</button>
            </form>
        </>
    );
};

export default ProfileSettings;