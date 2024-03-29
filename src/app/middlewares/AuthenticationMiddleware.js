const Jwt = require('jsonwebtoken');

const AuthConfig = require('../../config/auth');

class Authentication {
  async init(req, res, next) {
    try {
      const { authorization = null } = req.headers;

      if (!authorization)
        return res.status(400).json({ message: 'Missing token' });

      const [, token] = authorization.split(' ');
      const decoded_token = await Jwt.verify(token, AuthConfig.secret);

      if (decoded_token.error)
        return res.status(401).json({ message: 'Invalid Token' });

      if (!decoded_token.user)
        return res.status(401).json({ message: 'Invalid user' });

      res.locals.user = decoded_token.user;

      next();
    } catch (e) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  }
}

module.exports = new Authentication().init;
