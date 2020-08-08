import Joi from "@hapi/joi";

const forgotPasswordSchema = Joi.object({
  userName: Joi.string().required().label("Username"),
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  newPassword: Joi.string().required().label("New Password"),
});

export default forgotPasswordSchema;
