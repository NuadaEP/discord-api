const Mongoose = require('mongoose');

const MessageModel = new Mongoose.Schema(
  {
    chat_id: {
      type: String,
      require: true
    },
    user_id: {
      type: String,
      require: true
    },
    is_readed: {
      type: Boolean,
      require: true
    },
    is_sended: {
      type: Boolean,
      require: true
    },
    content: {
      type: String,
      require: true
    },
    custom_fields: {
      type: String,
      require: true
    },
  },
  {
    timestamps: true
  }
);

module.exports = Mongoose.model('Message', MessageModel)
