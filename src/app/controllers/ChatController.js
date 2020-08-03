const UserModel = require('../models/UserModel');
const ChatModel = require('../models/ChatModel');
const ChatValidator = require('../validators/ChatValidator');

class ChatController {
  async index(req, res) {
    const { _id: creator_id } = res.locals.user;

    const response = await ChatModel.find({
      $or: [
        {
          creator: creator_id,
        },
        {
          user: creator_id,
        },
      ],
    }).populate(['creator', 'user']);

    return res.json(response);
  }

  async store(req, res) {
    try {
      await ChatValidator(req.body, 'store');

      const { _id: creator_id } = res.locals.user;

      const { user_id } = req.body;

      if (creator_id === user_id) {
        return res
          .status(400)
          .json({ message: 'You cannot creat a chat with yourself' });
      }

      const verifyAlreadyCreatedChat = await ChatModel.findOne({
        $or: [
          {
            $and: [{ creator: creator_id }, { user: user_id }],
          },
          {
            $and: [{ creator: user_id, user: creator_id }],
          },
        ],
      });

      if (verifyAlreadyCreatedChat) {
        return res.status(400).json({ message: 'This chat already exist' });
      }

      const creator = await UserModel.findById(creator_id);

      const user = await UserModel.findById(user_id);

      if (!user) {
        return res.status(400).json({
          message: 'This user that you start the chat does not exists',
        });
      }

      const response = await ChatModel.create({
        creator,
        user,
      });

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new ChatController();
