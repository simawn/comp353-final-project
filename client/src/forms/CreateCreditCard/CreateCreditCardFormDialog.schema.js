import Joi from "@hapi/joi";

const createCreditCardSchema = Joi.object({
  creditCardNumber: Joi.string().length(16).regex(/^\d+$/).required().label("Credit Card Number"),
  cvv: Joi.string().length(3).regex(/^\d+$/).required().label("CVV"),
  expirationDate: Joi.string()
    .length(5)
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
    .required()
    .label("Expiration Date (MM/YY)"),
});

export default createCreditCardSchema;
