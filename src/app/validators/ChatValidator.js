const Yup = require('yup');

class ChatValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          external_id: Yup.string().required(),
          users: Yup.string().required(),
          last_message_resume: Yup.string(),
          last_message_created_at: Yup.string(),
          created_at: Yup.date().required(),
          ended_at: Yup.date(),
          custom_fields: Yup.string().required(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          external_id: Yup.string(),
          users: Yup.string(),
          last_message_resume: Yup.string(),
          last_message_created_at: Yup.string(),
          created_at: Yup.date(),
          ended_at: Yup.date(),
          custom_fields: Yup.string(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new ChatValidator().validation;
