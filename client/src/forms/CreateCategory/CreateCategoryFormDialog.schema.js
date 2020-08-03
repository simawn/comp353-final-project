import Joi from "@hapi/joi";

const createCategorySchema = Joi.object({
  categoryName: Joi.string().required().label("Category Name"),
});

export default createCategorySchema;
