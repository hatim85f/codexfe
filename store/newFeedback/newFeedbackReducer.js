import { ADD_NEW_FEEDBACK } from "./newFeedbackActions";

const initialState = {
  newFeedback: {},
};

export const newFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_FEEDBACK:
      return {
        ...state,
        newFeedback: action.payload,
      };
    default:
      return state;
  }
};
