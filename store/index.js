import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { newFeedbackReducer } from "./newFeedback/newFeedbackReducer";
import { authReducer } from "./auth/authReducer";

const mainStore = configureStore({
  reducer: {
    auth: authReducer,
    newFeedBack: newFeedbackReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export default mainStore;
