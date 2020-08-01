import { createSelector } from "reselect";

const jobStateSelector = (state) => state.jobReducer;

export const jobsListSelector = createSelector([jobStateSelector], (jobState) => jobState.jobsList);

export const jobCategoryListSelector = createSelector([jobStateSelector], (jobState) => jobState.categoryList);

export const jobListIsLoadingSelector = createSelector([jobStateSelector], (jobState) => jobState.isLoadingJobsList);

export const jobCategoryListIsLoadingSelector = createSelector(
  [jobStateSelector],
  (jobState) => jobState.isLoadingCategoryList
);
