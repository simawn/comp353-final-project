import { combineReducers } from "redux";

// Combine all reducers into one - this is the expected behaviour of redux.
import jobReducer from "./jobs/jobReducer";
import applicantReducer from "./applicants/applicantReducer";

const rootReducer = combineReducers({
  jobReducer,
  applicantReducer,
});

export default rootReducer;
