import Joi from "@hapi/joi";

const editJobSchema = Joi.object({
  firstName: Joi.string().required().label("First Name"),
  lastName: Joi.string().required().label("Last Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().required().label("Password"),
});

export default editJobSchema;
