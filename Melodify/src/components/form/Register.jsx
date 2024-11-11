import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import useNotifications from "../../hooks/useNotifications";

const Register = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();
    

    const { notification, showNotification } = useNotifications(); 

    const emailHandler = (event) => setEmail(event.target.value);
    const nameHandler = (event) => setName(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);
    const addressHandler = (event) => setAddress(event.target.value);
    const phoneHandler = (event) => setPhone(event.target.value);

    const registerHandler = async (event) => {
        event.preventDefault();

        setLoading("Cargando...");

        try {
            const res = await fetch("https://localhost:7014/api/UserAdmin/Create-User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, address, phone, password }),
            });

            if (!res.ok) {
                setLoading("");
                const data = await res.json();
                throw new Error(data.message || "Failed to register");
            }

            setLoading("");

            showNotification("Usuario registrado exitosamente", "success");

            setTimeout(() => {
                navigate("/login");
            }, 2500); 
        } catch (err) {
            showNotification(err.message, "error");
        }
    };

    return (
        <>
            <Navbar showHome={true} showLogin={true} />
            <form onSubmit={registerHandler}>
                <input
                    type="text"
                    value={name}
                    placeholder="Nombre"
                    onChange={nameHandler}
                    required
                />
                <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={emailHandler}
                    required
                />
                <input
                    type="text"
                    value={address}
                    placeholder="Localidad"
                    onChange={addressHandler}
                    required
                />
                <input
                    type="tel"
                    value={phone}
                    placeholder="Número de teléfono"
                    onChange={phoneHandler}
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Contraseña"
                    onChange={passwordHandler}
                    required
                />
                <button type="submit">Crear cuenta</button>
                <h4>{loading}</h4>
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
            </form>
        </>
    );
};

export default Register;