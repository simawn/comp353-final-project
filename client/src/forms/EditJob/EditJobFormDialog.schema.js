import Joi from "@hapi/joi";

const editJobSchema = Joi.object({
  title: Joi.string().required().label("Job Name"),
  jobDescription: Joi.string().required().label("Job Description"),
  category: Joi.string().required().label("Category"),
  employeesNeeded: Joi.number().integer().min(1).max(25).required().label("Number of Employees Needed"),
});

export default editJobSchema;
