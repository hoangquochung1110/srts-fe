import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";
    const clickHandler = () => {
        auth.logIn();
        navigate(from, {replace: true});
    }
    return (
        <div id="fb-login">
            <button id="fb-button" onClick={clickHandler}>Login with Facebook</button>
        </div>
        
    )
}

export default Login;