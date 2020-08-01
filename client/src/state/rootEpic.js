import { combineEpics } from "redux-observable";

import jobEpics from "./jobs/jobEpics";
import applicantEpics from "./applicants/applicantEpics";
import userEpics from "./user/userEpics";

// Combine all epics into one; this is the expected behaviour of redux-observable.
const rootEpic = combineEpics(jobEpics, applicantEpics, userEpics);

export default rootEpic;
