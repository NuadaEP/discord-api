const Yup = require('yup');

class MessageValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          user_id: Yup.string().required(),
          content: Yup.string().required(),
          custom_fields: Yup.string(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          user_id: Yup.string(),
          content: Yup.string(),
          custom_fields: Yup.string(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new MessageValidator().validation;
