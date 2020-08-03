const Mongoose = require('mongoose');

const MessageModel = new Mongoose.Schema(
  {
    chat: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'chat',
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    is_readed: {
      type: Boolean,
      default: false,
    },
    is_sended: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model('Message', MessageModel);
