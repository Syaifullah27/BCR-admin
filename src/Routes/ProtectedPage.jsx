import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"
// import { useNavigate, Outlet } from "react-router-dom"


// eslint-disable-next-line react/prop-types
const ProtectedPage = ({ children }) => {
    const token = localStorage.getItem("token_admin_binar")

    return token ? <>{children || <Outlet />}</> : <Navigate to="/login" />

}

export default ProtectedPage