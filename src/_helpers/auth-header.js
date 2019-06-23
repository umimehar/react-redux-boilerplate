import { TOKEN_KEY } from "./auth";

export const authHeader = () => {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem(TOKEN_KEY));

    if (user && user.access_token) {
        return { 'x-auth-token': user.access_token };
    } else {
        return {};
    }
}