import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../services/authentication/AuthenticationContext";
import PropTypes from 'prop-types';

const Navbar = ({ showHome, showUserManagement, showAlbumManagement, showLogout, showLogin, showRegister, showMyCreations, showMyCart, showMyMusic, showSettings }) => {
    const { handleLogout, user } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const goToDashboard = () => {

        if (!user) {
            navigate("/");
            return;
        }

        switch (user.role) {
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
                navigate("/");
                break;
        }
    };

    
    return (
        <nav className="navbar">
            {showHome && <button onClick={goToDashboard}>Home</button>}
            {showUserManagement && <button onClick={() => navigate("/admin/user-management")}>User Management</button>}
            {showAlbumManagement && <button onClick={() => navigate("/admin/album-management")}>Album Management</button>}
            {showLogout && <button onClick={() => { handleLogout(); navigate("/login"); }}>Logout</button>}
            {showLogin && <button type="button" onClick={() => navigate("/login")}>Login</button>}
            {showRegister && <button onClick={() => navigate("/register")}>Register</button>}
            {showMyCreations && <button onClick={() => navigate("/artist/my-creations")}>Mis Creaciones</button>}
            {showMyCart && <button onClick={() => navigate("/client/my-cart")}>Mi Carrito</button>}
            {showMyMusic && <button onClick={() => navigate("/client/my-music")}>Mi Música</button>}
            {showSettings && <button onClick={() => navigate("/user/profile-settings")}>Configuración</button>}

        </nav>
    );
};

Navbar.propTypes = {
    showHome: PropTypes.bool,
    showUserManagement: PropTypes.bool,
    showAlbumManagement: PropTypes.bool,
    showLogout: PropTypes.bool,
    showLogin: PropTypes.bool,
    showRegister: PropTypes.bool,
    showMyCreations: PropTypes.bool,
    showMyCart: PropTypes.bool,
    showMyMusic: PropTypes.bool,
    showSettings: PropTypes.bool,
}

Navbar.defaultProps = {
    showHome: false,
    showUserManagement: false,
    showAlbumManagement: false,
    showLogout: false,
    showLogin: false,
    showRegister: false,
    showMyCreations: false,
    showMyCart: false,
    showMyMusic: false,
    showSettings: false
};

export default Navbar;