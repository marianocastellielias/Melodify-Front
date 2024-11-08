import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Register = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const nameHandler = (event) => {
        setName(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const addressHandler = (event) => {
        setAddress(event.target.value);
    }

    const phoneHandler = (event) => {
        setPhone(event.target.value);
    }

    const registerHandler = async (event) => {
        event.preventDefault();
        setError(null);
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
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
        <Navbar showHome={true} showLogin={true} />
        <form onSubmit={registerHandler}>
            <input
                type="name"
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
                type="address"
                value={address}
                placeholder="Localidad"
                onChange={addressHandler}
                required
            />

            <input
                type="phone"
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
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </form>
        </>
    );
};

export default Register;