const express = require('express');

const {
  upload,
  authMiddleware,
  validation,
  controllerWrapper,
} = require('../../Middlewares');
const {
  joiSubscriptionSchema,
  joiVerifyEmailSchema,
} = require('../../Schema/joiAuthSchema');
const { users: ctrl } = require('../../Controllers');
const { reSendEmail } = require('../../helpers');

const router = express.Router();

router.get('/current', authMiddleware, controllerWrapper(ctrl.getCurrent));

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verifyEmail));

router.post(
  '/verify',
  validation(joiVerifyEmailSchema),
  controllerWrapper(reSendEmail),
);

router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
);

router.patch(
  '/',
  authMiddleware,
  validation(joiSubscriptionSchema),
  controllerWrapper(ctrl.updateSubscription),
);

module.exports = router;
