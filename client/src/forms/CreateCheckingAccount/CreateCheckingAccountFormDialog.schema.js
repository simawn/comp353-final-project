import Joi from "@hapi/joi";

const createCheckingAccountSchema = Joi.object({
  accountNumber: Joi.string().length(10).regex(/^\d+$/).required().label("Account Number"),
});

export default createCheckingAccountSchema;
