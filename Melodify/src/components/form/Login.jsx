import { useState, useContext } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const { handleLogin } = useContext(AuthenticationContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading("Cargando...");
        setError(null);

        const isAuthenticated = await handleLogin(email, password);

        if (isAuthenticated) {
            const token = localStorage.getItem("bookchampions-token");
            if (token) {
                const decodedToken = jwtDecode(token); // Usa jwt_decode como import por defecto
                const userRole = decodedToken.role;

                switch (userRole) {
                    case "Admin":
                        navigate("/admin-dashboard");
                        break;
                    case "Artist":
                        navigate("/artist-dashboard");
                        break;
                    case "Client":
                        navigate("/");
                        break;
                    default:
                        navigate("/login");
                        break;
                }
            }
        } else {
            setLoading("");
            setError("Credenciales incorrectas.");
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <input type="email" value={email} placeholder="Ingrese su email" onChange={emailHandler} required />
            <input type="password" value={password} placeholder="Ingrese su contraseña" onChange={passwordHandler} required />
            <button type="submit">Iniciar Sesión</button>
            <h4>{loading}</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Login;

