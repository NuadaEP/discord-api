const Mongoose = require('mongoose');

const UserModel = new Mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    external_id: {
      type: String,
      require: true,
    },
    custom_fields: {
      type: String,
      require: true,
    },
    is_active: {
      type: Boolean,
      require: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model('User', UserModel);
