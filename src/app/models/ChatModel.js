const Mongoose = require('mongoose');

const ChatModel = new Mongoose.Schema(
  {
    creator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    last_message_resume: String,
    last_message_created_at: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model('Chat', ChatModel);
