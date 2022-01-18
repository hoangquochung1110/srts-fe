import { useContext, createContext, useState, useEffect } from "react";
import { accountService } from '../service/accountService';


const authContext = createContext();

/*
Hook for children components to get the auth object.
The auth object helps conditional rendering
*/
export const useAuth = () => {
    return useContext(authContext);
}

/*
Hook to create the auth object and manage state
and wrap Facebook SDK
*/ 
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(()=>{
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                setUser('user');
            }else{
                setUser(null);
            }
        })
    },[user]);

    const logIn = () => {
        setUser('user');
        accountService.login();
    }

    const logOut = () => {
        setUser(null);
        accountService.logout();
    }

    return {
        user,
        logIn,
        logOut,
    }
}

// A component that makes the auth object available to its children components
export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}