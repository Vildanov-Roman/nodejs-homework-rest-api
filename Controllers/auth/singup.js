const { Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { sendEmail } = require('../../helpers');
require('dotenv').config();

// const { DB_HOST } = process.env;

const { User } = require('../../models');

const singup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Verification successful',
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Confirm Email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json(result);
};

module.exports = singup;
