import { CLEAR_ERROR, ERROR } from "./authActions";

const initialState = {
  error: "",
  errorMessage: "",
  showError: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.error,
        errorMessage: action.errorMessage,
        showError: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: "",
        errorMessage: "",
        showError: false,
      };
    default:
      return state;
  }
};
