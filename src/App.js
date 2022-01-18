import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { useAuth } from "./hooks/useAuth";
import Header from './components/layout/Header';
import { Content } from "./components/layout/Content";

function App() {
  let auth = useAuth();
  let navigate = useNavigate();

  const [userData, setUserData] = useState('');
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetchUserData();
    fetchMemories();
    return () => { 
      setUserData('');
      setMemories([]); 
    } // cancel promise once the component is unmounted
  }, []);
  
  const fetchUserData = async () => {
    const authToken = localStorage.getItem('authToken');
    fetch(
      process.env.REACT_APP_BACKEND_URL+'dj-rest-auth/user/', {
      headers: {
          'Authorization': 'Token ' + authToken,
      }
    })
    .then(response => {
      if(response.status === 200 || response.status === 201) return response.json();
      else alert('Fail to log in with FB');
    })
    .then(JSONResponse => {
      setUserData(JSONResponse);
    })
  }

  const fetchMemories = async () => {
    const authToken = localStorage.getItem('authToken');
    fetch(
      process.env.REACT_APP_BACKEND_URL+'locations/', {
      headers: {
          'Authorization': 'Token ' + authToken,
      }
    })
    .then(response => {
      if(response.status === 200) return response.json();
      else alert('Fail to fetch data');
    })
    .then(JSONResponse => setMemories(JSONResponse))
  }

  const clickHandler = () => {
    auth.logOut();
    navigate("/");
  }

  return (
    <>
      <Header name={userData.first_name} onClick={clickHandler}/>
      <Content memories={memories}/>
    </>
  );
}

export default App;
