import { createSelector } from "reselect";

const applicantStateSelector = (state) => state.applicantReducer;

export const applicantStatusListSelector = createSelector(
  [applicantStateSelector],
  (applicantState) => applicantState.applicantStatusList
);

export const isLoadingApplicantStatusListSelector = createSelector(
  [applicantStateSelector],
  (applicantState) => applicantState.isLoadingApplicantStatusList
);

export const applicantIsSubmittingSelector = createSelector(
  [applicantStateSelector],
  (applicantState) => applicantState.isSubmitting
);
