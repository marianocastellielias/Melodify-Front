import Login from './components/form/Login';
import Register from './components/form/Register';
import './App.css';
import Dashboard from './components/home/Dashboard';
import AdminDashboard from './components/adminPages/home/AdminDashboard';
import ArtistDashboard from './components/artistPages/home/ArtistDashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register />},
    { path: "/admin-dashboard", element: <AdminDashboard />},
    { path: "/artist-dashboard", element: <ArtistDashboard />}

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
