import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainLink } from "../mainLink";
import { Platform } from "react-native";
import { Alert } from "react-native";

export const CLEAR_ERROR = "CLEAR_ERROR";
export const ERROR = "ERROR";

export const setError = (error, errorMessage) => {
  return async (dispatch) => {
    dispatch({
      type: ERROR,
      error: error,
      errorMessage: errorMessage,
    });
  };
};

export const clearError = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};
