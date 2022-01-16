const facebookAppId = process.env.REACT_APP_FB_APP_ID;

export const accountService = {
    login,
    logout,
    getAuthResponse,
    getUserData,
    apiAuthenticate
};

async function login(){
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;
    await accountService.apiAuthenticate(authResponse.accessToken);
}

function logout(){
    window.FB.logout();
    localStorage.removeItem('authToken');
}

async function apiAuthenticate(accessToken){
    const data = {'access_token': accessToken};
    try{
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL+'rest-auth/facebook/', 
            {   
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            });
        const jsonRes = await response.json();
        console.log(jsonRes);
        localStorage.setItem('authToken', jsonRes.key);
    } catch(err){
        console.log(err);
    }

}

function getAuthResponse(){
    return window.FB.getAuthResponse();
}

function getUserData(userID){
    window.FB.api(
                `/${userID}/`, 
                {fields: 'id, first_name, last_name, picture'},
                function(response){
                    if (response.error) return;
                    else{
                        console.log(response);
                        return response;
                    }
                });
}

export async function FBSdkInit() {
    console.log('init fb sdk');
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: facebookAppId,
                cookie: true,
                xfbml: true,
                version: 'v12.0'
            });

            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
                } else {
                    resolve();
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));    
    });
}