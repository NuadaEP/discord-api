const UserModel = require('../models/UserModel');
const CustomFieldValidator = require('../validators/CustomFieldValidator');

class CustomFieldController {
  async store(req, res) {
    try {
      await CustomFieldValidator(req.body, 'store');

      const condition = { external_id: req.params.external_id };

      const user = await UserModel.findOne(condition);

      const custom_fields = JSON.parse(user.custom_fields);

      const update = {
        ...user.toJSON(),
        custom_fields: JSON.stringify({ ...custom_fields, ...req.body.field }),
      };

      const response = await UserModel.findOneAndUpdate(condition, update);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { external_id, field_name } = req.params;

      const condition = { external_id };

      const user = await UserModel.findOne(condition);

      const custom_fields = JSON.parse(user.custom_fields);

      delete custom_fields[field_name];

      const update = {
        ...user.toJSON(),
        custom_fields: JSON.stringify({ ...custom_fields, ...req.body.field }),
      };

      const response = await UserModel.findOneAndUpdate(condition, update);

      return res.json(response);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CustomFieldController();
