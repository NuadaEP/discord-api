const Yup = require('yup');

class ChatValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          external_id: Yup.string(),
          user_id: Yup.string().required(),
          last_message_resume: Yup.string(),
          last_message_created_at: Yup.string(),
          ended_at: Yup.date(),
          custom_fields: Yup.string(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          external_id: Yup.string(),
          user_id: Yup.string(),
          last_message_resume: Yup.string(),
          last_message_created_at: Yup.string(),
          ended_at: Yup.date(),
          custom_fields: Yup.string(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new ChatValidator().validation;
