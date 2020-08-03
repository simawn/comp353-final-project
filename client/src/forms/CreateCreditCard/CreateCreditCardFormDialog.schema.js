import Joi from "@hapi/joi";

const createCreditCardSchema = Joi.object({
  creditCardNumber: Joi.string().length(16).regex(/^\d+$/).required().label("Credit Card Number"),
  cvv: Joi.string().length(3).regex(/^\d+$/).required().label("CVV"),
  expirationDate: Joi.string()
    .length(5)
    .regex(/\d\d\/\d\d/)
    .required()
    .label("Expiration Date (MM/YY)"),
});

export default createCreditCardSchema;
