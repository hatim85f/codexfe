import { ERROR } from "../auth/authActions";
import { mainLink } from "../mainLink";

export const ADD_NEW_FEEDBACK = "ADD_NEW_FEEDBACK";

export const addNewFeedback = (newFeedback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${mainLink}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: newFeedback.name,
          clientEmail: newFeedback.email,
          clientPhone: newFeedback.phone,
          clientProject: newFeedback.project,
          clientFeedback: newFeedback.feedback,
          feedbackTitle: newFeedback.feedbackTitle,
          clientPosition: newFeedback.title,
          imageURL: newFeedback.imageURL,
          clientRating: newFeedback.stars,
          note: newFeedback.notes,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        dispatch({
          type: ERROR,
          error: resData.error,
          errorMessage: resData.errorMessage,
        });
      } else {
        dispatch({
          type: ERROR,
          error: "Done",
          errorMessage: resData.message,
        });
      }

      dispatch({
        type: ADD_NEW_FEEDBACK,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
