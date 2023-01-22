const { Unauthorized, BadRequest } = require('http-errors');
const { sendEmail } = require('./sendEmail');
const { User } = require('../models');
require('dotenv').config();

// const { DB_HOST } = process.env;

const reSendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw Unauthorized('Email is wrong');
  }

  if (!user.verificationToken) {
    throw BadRequest('Verification has already been passed');
  }

  const msg = {
    to: email,
    subject: 'Email verify',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Verify email</a>`,
  };

  await sendEmail(msg);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      message: 'Verification email sent',
    },
  });
};

module.exports = { reSendEmail };
