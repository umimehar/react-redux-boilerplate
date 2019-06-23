import { config } from '../env/config';
import { TOKEN_KEY } from '../_helpers/auth';
import { authHeader } from '../_helpers/auth-header';

export const userService = {
    login,
    logout,
    validateToken
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username:email, password })
    };
    const loginUrl = config["loginUrl-stagging"]

    return fetch(loginUrl, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(TOKEN_KEY, JSON.stringify(user));

            return user;
        })
        .catch(handleError);
}

function validateToken () {
    const requestOptions = {
        method: 'POST',
        headers: {...{ 'Content-Type': 'application/json' }, ...authHeader()},
    };
    const validateUrl = config["validateUrl-stagging"]
    return fetch(validateUrl, requestOptions)
        .then(res =>{
            // console.log(res)
            return res
        })
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
            
            return user;
        })
        .catch(err=>{
            // window.location.reload()
            return handleError(err)
        } );
}

function logout() {
    // remove user from local storage to log user out
    const logOutUrl = config["logoutUrl-stagging"]
    const requestOptions = {
        method: 'POST',
        headers: {...{ 'Content-Type': 'application/json' }, ...authHeader()},
    };
    if (localStorage.getItem(TOKEN_KEY)) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
        return fetch(logOutUrl, requestOptions)
        .then(res =>{
            console.log("logging out.",res)
            
            return res
        })
    } else {
        return true
    }

    
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText === 'Unauthorized' ? 'Username and Password is incorrect.' : "Server Error.";
            return Promise.reject(error);
        }

        return data;
    });
}
function handleError(err){
    if (typeof err === 'object' && err.message === 'Failed to fetch') {
        throw new Error("Network error. " + err.message)
    } else {
        throw err
    }
    
    
}