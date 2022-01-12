import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useAuth } from "./hooks/useAuth";

function App() {

  return (
    <div>
      <AuthStatus/>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/memories">Your memories</Link>
        </li>
      </ul>
    </div>
  );
}


const AuthStatus = () => {
  let auth = useAuth();
  let navigate = useNavigate();

  const [userData, setUserData] = useState('');

  useEffect(() => {
    fetchData();


  
    return () => { setUserData('') } // cancel promise once the component is unmounted
  }, []);

  async function fetchData() {
    const authToken = localStorage.getItem('authToken');
    fetch(
      process.env.REACT_APP_BACKEND_URL+'rest-auth/user/', {
      headers: {
          'Authorization': 'Token '+authToken,
      }
    })
    .then(response => {
      return response.json();
    })
    .then(JSONResponse => setUserData(JSONResponse))
  }

  const clickHandler = () => {
    auth.logOut();
    navigate("/");
  }

  if(auth.user){
    return (
      <p>
        Welcome {userData.first_name} !!!
        <button 
          onClick={clickHandler}
        >
          Log out
        </button>  
      </p>
      
    )
  }
  return <div>Please log in to enjoy your memories</div>

}
export default App;
