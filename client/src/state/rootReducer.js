import { combineReducers } from "redux";

// Combine all reducers into one - this is the expected behaviour of redux.
import jobReducer from "./jobs/jobReducer";

const rootReducer = combineReducers({
  jobReducer,
});

export default rootReducer;
