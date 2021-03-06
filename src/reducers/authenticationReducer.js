import { userConstants } from "../constants";
let user;
try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (e) {
  console.log(e);
}
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      console.log("loggingIn is set to true" + action);
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
      return {};
    case userConstants.LOGOUT:
      return {};

    default:
      return state;
  }
}
