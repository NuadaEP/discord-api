const UserValidator = require('../validators/UserValidator')
const User = require('../models/UserModel')

class UserController {
  async show(req, res) {
    const { _id: user_id } = res.locals.user

    return res.send({ user_id })
  }

  async store(req, res) {
    try {
      await UserValidator(req.body, 'store')

      const { email, password, confirmPassword } = req.body

      if (await User.findOne({ email }))
        return res
          .status(400)
          .json({ message: 'User is already in use' })

      if (password != confirmPassword)
        return res
          .status(400)
          .json({ message: 'The provided password is not identical' })

      return res.json(await User.create({ email, password }))
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new UserController()
