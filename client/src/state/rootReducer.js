import { combineReducers } from "redux";

// Combine all reducers into one - this is the expected behaviour of redux.
import jobReducer from "./jobs/jobReducer";
import applicantReducer from "./applicants/applicantReducer";
import userReducer from "./user/userReducer";
import paymentReducer from "./payments/paymentReducer";

const rootReducer = combineReducers({
  jobReducer,
  applicantReducer,
  userReducer,
  paymentReducer,
});

export default rootReducer;
