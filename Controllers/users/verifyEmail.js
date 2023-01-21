const { User } = require('../../models');
const { NotFound } = require('http-errors');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound(
      `User with verificationToken:${verificationToken} not found`,
    );
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: 'Verify success' });
};

module.exports = verifyEmail;
