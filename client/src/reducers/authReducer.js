import {
  SET_CURRENT_ADMIN,
  SEND_ADMIN_EMAIL,
  FETCH_ADMINS
} from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  admin: {},
  admins: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ADMINS:
      console.log("FETCH_ADMIN executed");
      return {
        ...state,
        admins: action.payload
      };
    case SEND_ADMIN_EMAIL:
      return {
        ...state,
        email: action.payload
      };
    case SET_CURRENT_ADMIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        admin: action.payload
      };
    default:
      return state;
  }
}
