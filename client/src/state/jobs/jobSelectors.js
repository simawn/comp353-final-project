import { createSelector } from "reselect";

const jobStateSelector = (state) => state.jobReducer;

export const jobsListSelector = createSelector([jobStateSelector], (jobState) => jobState.jobsList);

export const jobsListIsLoading = createSelector([jobStateSelector], (jobState) => jobState.isLoading);
