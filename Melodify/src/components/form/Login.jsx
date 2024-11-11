import { useState, useContext } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import useNotifications from "../../hooks/useNotifications";

const Login = () => {
    const { handleLogin } = useContext(AuthenticationContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();
    
    const { notification, showNotification } = useNotifications(); 

    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading("Cargando...");


        const { isAuthenticated, decodedUser } = await handleLogin(email, password);

        if (isAuthenticated) {

            switch (decodedUser.role) {
                case "Admin":
                    navigate("/admin-dashboard");
                    break;
                case "Artist":
                    navigate("/artist-dashboard");
                    break;
                case "Client":
                    navigate("/client-dashboard");
                    break;
                default:
                    navigate("/login");
                    break;
            }
        } else {
            setLoading("");
            showNotification("Credenciales incorrectas.", "error");
        }
    };

    return (
        <>
            <Navbar showRegister={true} showHome={true} />
            <form onSubmit={submitHandler}>
                <input type="email" value={email} placeholder="Ingrese su email" onChange={emailHandler} required />
                <input type="password" value={password} placeholder="Ingrese su contraseña" onChange={passwordHandler} required />
                <button type="submit">Iniciar Sesión</button>
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

export default Login;