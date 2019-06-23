import { userService } from "../_services/user.service";

export const TOKEN_KEY = 'y-user';

export const login = () => {
    // need to add logic for login
    var user = {}
    localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
}

export const logout = () => {
    // need to send request for logout
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        let user = JSON.parse(localStorage.getItem(TOKEN_KEY))
        if (user.access_token){
            return user.access_token;
        } else {
            return false;
        }
        
    }

    return false;
}
export const validateLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        let user = JSON.parse(localStorage.getItem(TOKEN_KEY))
        if (user.access_token){
            return userService.validateToken()
        } else {
            return false;
        }
        
    }

    return false;
}