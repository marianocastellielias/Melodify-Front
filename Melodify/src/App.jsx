import Login from './components/form/Login';
import Register from './components/form/Register';
import './App.css';
import Dashboard from './components/home/Dashboard';
import AdminDashboard from './components/pages/adminPages/home/AdminDashboard';
import ArtistDashboard from './components/pages/artistPages/home/ArtistDashboard';
import ClientDashboard from './components/pages/clientPages/home/ClientDashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumManagement from './components/pages/adminPages/albumManagement/AlbumManagement';
import UserManagement from './components/pages/adminPages/userManagement/UserManagement';
import MyCreations from './components/pages/artistPages/myCreations/MyCreations';
import MyCart from './components/pages/clientPages/MyCart/MyCart';
import MyMusic from './components/pages/clientPages/myMusic/MyMusic';
import ProfileSettings from './components/pages/clientPages/ProfileSettings/ProfileSettings';

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register />},
    { path: "/admin-dashboard", element: <AdminDashboard />},
    { path: "/admin/album-management", element: <AlbumManagement />},
    {path: "/admin/user-management", element: <UserManagement />},
    { path: "/artist-dashboard", element: <ArtistDashboard />},
    { path: "/client-dashboard", element: <ClientDashboard /> },
    {path: "/artist/my-creations", element: <MyCreations />},
    {path: "/client/my-cart", element: <MyCart />},
    {path: "/client/my-music", element: <MyMusic />},
    {path:"/client/profile-settings", element: <ProfileSettings />}
  ]);


  return (
    <>
      <div className="d-flex flex-column align-items-center">
        {<RouterProvider router={router} />}
      </div>
    </>
  )
}

export default App
