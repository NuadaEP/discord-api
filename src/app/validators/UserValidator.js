const Yup = require('yup');

class UserValidator {
  validation(body, role) {
    let validationConfig;

    switch (role) {
      case 'store':
        validationConfig = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .email()
            .required(),
          password: Yup.string()
            .required()
            .min(6),
          confirmPassword: Yup.string()
            .required()
            .min(6),
        });
        break;

      case 'update':
        validationConfig = Yup.object().shape({
          email: Yup.string().email(),
          password: Yup.string().min(6),
          confirmPassword: Yup.string().min(6),
        });
        break;
    }

    return validationConfig.validate(body, { abortEarly: true });
  }
}

module.exports = new UserValidator().validation;
