import { combineEpics } from "redux-observable";

import jobEpics from "./jobs/jobEpics";

// Combine all epics into one; this is the expected behaviour of redux-observable.
const rootEpic = combineEpics(jobEpics);

export default rootEpic;
