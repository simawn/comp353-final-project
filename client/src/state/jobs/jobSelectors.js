import { createSelector } from "reselect";

const jobStateSelector = (state) => state.jobReducer;

export const jobsListSelector = createSelector([jobStateSelector], (jobState) => jobState.jobsList);

export const jobCategoryListSelector = createSelector([jobStateSelector], (jobState) => jobState.categoryList);

export const jobListIsLoadingSelector = createSelector([jobStateSelector], (jobState) => jobState.isLoadingJobsList);

export const jobLimitSelector = createSelector([jobStateSelector], (jobState) => jobState.atJobLimit);

export const jobCategoryListIsLoadingSelector = createSelector(
  [jobStateSelector],
  (jobState) => jobState.isLoadingCategoryList
);

export const jobIsSubmittingSelector = createSelector([jobStateSelector], (jobState) => jobState.isSubmitting);
