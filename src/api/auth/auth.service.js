const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const { User } = require('./../../database/models');

const me = token => token.user;

const register = async ({
  email, password, firstName, lastName,
}) => {
  const user = new User({
    email,
    password,
    firstName,
    lastName,
  });

  return user.save();
};

// eslint-disable-next-line consistent-return
const login = ({ email, password }) => new Promise(async (resolve, reject) => {
  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return reject(new Error(`Could not find user with e-mail ${email}`));
  }

  try {
    await user.comparePassword(password);

    user = lodash.omit(user.toJSON(), 'password');

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      // eslint-disable-next-line radix
      expiresIn: parseInt(process.env.JWT_EXPIRE),
    });

    resolve({
      user,
      token,
    });
  } catch (err) {
    reject(err);
  }
});

module.exports = {
  me,
  register,
  login,
};
