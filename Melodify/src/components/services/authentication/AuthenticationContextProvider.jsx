import { useState } from "react";
import PropType from "prop-types";
import { AuthenticationContext } from "./AuthenticationContext";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("bookchampions-token");
const userValue = token ? jwtDecode(token) : null;

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(userValue);
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            const res = await fetch("https://localhost:7014/api/Authentication/authenticate", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const token = await res.text();
            localStorage.setItem("bookchampions-token", token);

            const decodedUser = jwtDecode(token); 
            setUser(decodedUser);
            setError(null);
            return true;
        } catch (err) {
            console.error("Error de autenticación:", err);
            setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
            return false;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("bookchampions-token");
        setUser(null);
        setError(null);
    };

    return (
        <AuthenticationContext.Provider value={{ user, error, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContextProvider.propTypes = {
    children: PropType.node,
};

