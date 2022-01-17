import { Link, useNavigate } from "react-router-dom";

const Header = ({name, onClick}) => {
    return (
            <ul id="navbar">
                <li>
                    Hi {name}
                </li>
                <li>
                    About
                </li>
                <li>
                    <Link to="/memories">New memories</Link>
                </li>
                <li>
                    <a onClick={onClick}>Log Out</a>
                </li>
            </ul>
    )
}

export default Header;