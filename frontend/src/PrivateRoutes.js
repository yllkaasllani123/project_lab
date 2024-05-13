import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuthenticated = sessionStorage.getItem('isLoggedIn') === 'true';
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes