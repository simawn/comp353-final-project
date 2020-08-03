import Joi from "@hapi/joi";

const makePayment = Joi.object({
  payment: Joi.number().min(0).required().label("Payment Amount"),
});

export default makePayment;
