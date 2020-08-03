import { createSelector } from "reselect";

const paymentStateSelector = (state) => state.paymentReducer;

export const paymentMethodListSelector = createSelector(
  [paymentStateSelector],
  (paymentState) => paymentState.paymentMethodList
);

export const paymentIsLoadingSelector = createSelector(
  [paymentStateSelector],
  (paymentState) => paymentState.isLoading
);

export const paymentIsSubmittingSelector = createSelector(
  [paymentStateSelector],
  (paymentState) => paymentState.isSubmitting
);
