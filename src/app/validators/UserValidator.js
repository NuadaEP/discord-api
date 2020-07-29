const Yup = require('yup')

class UserValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          name: Yup.string().required(),
          external_id: Yup.string().required(),
          custom_fields: Yup.string().required(),
          is_active: Yup.boolean().required(),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          name: Yup.string(),
          external_id: Yup.string(),
          custom_fields: Yup.string(),
          is_active: Yup.boolean(),
        });
        break;
    }

    return validationConfig.validate(body);
  }
}

module.exports = new UserValidator().validation
