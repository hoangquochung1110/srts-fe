import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children}) => {
    let auth = useAuth();

    return(
        auth.user ? children : <Navigate to="/login" />
    )
}