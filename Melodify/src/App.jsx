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
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import Protected from './components/routes/Protected';
import AlbumDetail from './components/pages/clientPages/myMusic/albumDetail/AlbumDetail';

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/admin-dashboard", element: (
      <Protected requiredRoles={['Admin']}>
        <AdminDashboard />
      </Protected>
    )},
    { path: "/admin/album-management", element: (
      <Protected requiredRoles={['Admin']}>
        <AlbumManagement />
      </Protected>
    )},
    { path: "/admin/user-management", element: (
      <Protected requiredRoles={['Admin']}>
        <UserManagement />
      </Protected>
    )},
    { path: "/artist-dashboard", element: (
      <Protected requiredRoles={['Artist']}>
        <ArtistDashboard />
      </Protected>
    )},
    { path: "/client-dashboard", element: (
      <Protected requiredRoles={['Client']}>
        <ClientDashboard />
      </Protected>
    )},
    { path: "/artist/my-creations", element: (
      <Protected requiredRoles={['Artist']}>
        <MyCreations />
      </Protected>
    )},
    { path: "/client/my-cart", element: (
      <Protected requiredRoles={['Client']}>
        <MyCart />
      </Protected>
    )},
    { path: "/client/my-music", element: (
      <Protected requiredRoles={['Client']}>
        <MyMusic />
      </Protected>
    )},
    { path: "/client/my-music/album/:albumId", element: (
      <Protected requiredRoles={['Client']}>
        <AlbumDetail />
      </Protected>
    )},
    { path: "/user/profile-settings", element: (
      <Protected requiredRoles={['Client', 'Artist']}>
        <ProfileSettings />
      </Protected> )}
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
