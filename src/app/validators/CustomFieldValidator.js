const Yup = require('yup')

class CustomFieldValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          field: Yup.string().required(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          field: Yup.string(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new CustomFieldValidator().validation
