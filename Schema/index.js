const joiContactSchema = require('./joiContactSchema');
const {
  joiSingupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
} = require('./joiAuthSchema');

module.exports = {
  joiContactSchema,
  joiSingupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
};
