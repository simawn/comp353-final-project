/*
  This is just an example of what our selectors should look like.
  I still need to hook it up the back end.
*/

import { createSelector } from "reselect";

const jobStateSelector = (state) => state.jobReducer;

export const squadListSelector = createSelector([jobStateSelector], (jobState) => jobState.jobList);
