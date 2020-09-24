const User = require('../models/UserModel');
const FindOneUser = require('../services/FindOneUser');

class SessionController {
  async index(req, res) {
    const { email, password } = req.body;

    const user = await FindOneUser.execute(email);

    if (!user) return res.status(400).json({ message: 'User not found' });

    if (!(await user.compareHash(password)))
      return res.status(400).json({ message: 'Invalid password' });

    delete user.password;

    return res.json({ token: User.generateToken(user) });
  }
}

module.exports = new SessionController().index;
