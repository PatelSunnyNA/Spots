const Joi = require('joi')

module.exports.spotSchema = Joi.object({
  spot: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

module.exports.thoughtSchema = Joi.object({
thought: Joi.object({
rating: Joi.number().required().min(1).max(5),
body: Joi.string().required()
}).required()
})