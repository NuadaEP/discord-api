const Mongoose = require('mongoose');

const ChatModel = new Mongoose.Schema(
  {
    external_id: String,
    users: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    last_message_resume: String,
    last_message_created_at: Date,
    ended_at: { type: Date, default: null },
    custom_fields: String,
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model('Chat', ChatModel);
