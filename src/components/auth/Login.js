import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";
    console.log('location ', location);
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

// const Login  = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleResponse = (data) => {
//         // data['tokenDetail]['accessToken']
//         console.log(data);
//     }

//     const handleError = (error) => {
//         console.log(error);
//     }

//     return (
//         <FacebookProvider appId="1432163750519185">  
//             <LoginButton
//                 scope="email"
//                 onCompleted={handleResponse}
//                 onError={handleError}
//             >
//             <span>Login via Facebook</span>
//             </LoginButton>
//         </FacebookProvider>
//     )
// }

export default Login;