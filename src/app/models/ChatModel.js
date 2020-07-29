const Mongoose = require('mongoose');

const ChatModel = new Mongoose.Schema(
  {
    external_id: {
      type: String,
      require: true,
    },
    users: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    last_message_resume: {
      type: String,
      require: true,
    },
    last_message_created_at: {
      type: Date,
      require: true,
    },
    created_at: {
      type: Date,
      require: true,
    },
    ended_at: {
      type: Date,
      require: true,
    },
    custom_fields: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Mongoose.model('Chat', ChatModel);
