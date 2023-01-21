const Joi = require('Joi');

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const joiSingupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const joiVerifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).required().messages({
    'string.pattern.base': `Please fill a valid email address`,
  }),
});

module.exports = {
  joiSingupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
};
