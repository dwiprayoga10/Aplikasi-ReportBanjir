import { createBrowserRouter } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import AdminLayout from './Layout/AdminLayout'
import Dashboard from './Pages/admin/Dashboard'
import Mahasiswa from './Pages/admin/Mahasiswa'

const RouteList= createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children:[
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "/mahasiswa",
                element: <Mahasiswa/>
            }
        ]
    }

])
export default RouteList

