import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = ({name, onClick}) => {
    const auth = useAuth();
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Saritasa</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        
                        <a className="nav-link">Hi {name}</a>
                        <a className="nav-link"><Link to="/memories">New memories</Link></a>
                        { auth.user ? <a className="nav-link" onClick={onClick}>Log Out</a>
                            :
                            <a className="nav-link"><Link to="/login">Log In</Link></a>
                        }
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;