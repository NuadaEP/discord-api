const Yup = require('yup');

class MessageValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          content: Yup.string().required(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          content: Yup.string(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new MessageValidator().validation;
