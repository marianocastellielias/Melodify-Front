import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const { user, handleLogout } = useContext(AuthenticationContext);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: ""
    });
    const navigate = useNavigate();

    const logoutHandler = () => {
        handleLogout();
        navigate("/login");
    };

    const goToAlbumManagementHandler = () => {
        navigate("/admin/album-management");
    };

    const goToDashboard = () => {
        navigate("/admin-dashboard");
    }

    const fetchUsers = async () => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch("https://localhost:7014/api/UserAdmin/Users", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("No se pudieron cargar los usuarios");
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUsers();
        }
    }, [user]);

    const nameHandler = (event) => {
        setNewUser((prev) => ({ ...prev, name: event.target.value }));
    };

    const emailHandler = (event) => {
        setNewUser((prev) => ({ ...prev, email: event.target.value }));
    };

    const addressHandler = (event) => {
        setNewUser((prev) => ({ ...prev, address: event.target.value }));
    };

    const phoneHandler = (event) => {
        setNewUser((prev) => ({ ...prev, phone: event.target.value }));
    };

    const passwordHandler = (event) => {
        setNewUser((prev) => ({ ...prev, password: event.target.value }));
    };

    const createUser = async () => {
        const token = localStorage.getItem("bookchampions-token");

        try {
            const response = await fetch("https://localhost:7014/api/UserAdmin/Create-User", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("Error al crear el usuario.");
            }

            setNewUser({ name: "", email: "", address: "", phone: "", password: "" });
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };


    const updateUserRole = async (id, newRole) => {
        try {
            const response = await fetch(`https://localhost:7014/api/UserAdmin/Update-Role/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!response.ok) {
                throw new Error("Error al cambiar el rol del usuario");
            }

            await fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://localhost:7014/Delete-User/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("bookchampions-token")}`
                }
            });
            if (!response.ok) {
                throw new Error("Error al eliminar el usuario.");
            }
            await fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };


    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="user-management">
            <button type="button" onClick={goToDashboard}>Inicio</button>
            <button onClick={logoutHandler}>Cerrar Sesión</button>
            <button type="button" onClick={goToAlbumManagementHandler}>Gestión de Álbumes</button>
            <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={newUser.name}
                    onChange={nameHandler}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={emailHandler}
                    required
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={newUser.address}
                    onChange={addressHandler}
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={newUser.phone}
                    onChange={phoneHandler}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={newUser.password}
                    onChange={passwordHandler}
                    required
                />
                <button type="submit">Crear Usuario</button>
            </form>
            <div className="users-list">
                <h2>Usuarios</h2>
                <div className="user-container">

                    {users
                        .filter((u) => (u.name !== user.name))
                        .map((u) => (
                            <div key={u.id} className="user-item">
                                <h3>Rol: {u.role}</h3>
                                <h3>{u.name}</h3>
                                <p>{u.email}</p>
                                <p>{u.phone}</p>
                                <p>Id: {u.id}</p>
                                <div>
                                    <p>Cambiar rol del usuario:</p>
                                    <button onClick={() => updateUserRole(u.id, "Artist")}>Artista</button>
                                    <button onClick={() => updateUserRole(u.id, "Client")}>Cliente</button>
                                    <button onClick={() => deleteUser(u.id)}>Eliminar usuario</button>
                                </div>
                                <hr />

                            </div>
                        ))}

                </div>
            </div>
        </div>
    );
};

export default UserManagement;
