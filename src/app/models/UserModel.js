const Mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const Jwt = require('jsonwebtoken');

const AuthConfig = require('../../config/auth');

const UserModel = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserModel.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await Bcrypt.hash(this.password, 8);
});

UserModel.methods = {
  compareHash(password) {
    return Bcrypt.compare(password, this.password);
  },
};

UserModel.statics = {
  generateToken(user) {
    return Jwt.sign({ user }, AuthConfig.secret, {
      expiresIn: AuthConfig.ttl,
    });
  },
};

module.exports = Mongoose.model('User', UserModel);
