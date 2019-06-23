import { userConstants } from '../_constants/user.constants';
import { TOKEN_KEY } from '../_helpers/auth';

let user = JSON.parse(localStorage.getItem( TOKEN_KEY ));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        error: true,
        errorMessage: action.error
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}