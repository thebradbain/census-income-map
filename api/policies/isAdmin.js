/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow an authenticated user with the admin role
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = async function(req, res, next) {
  // Ensure a user is authenticated
  let user = req.session.user;
  if (user) {
    // Determine if user is admin
    let admin = await User.findOne({
      username: user.username,
      role: 'admin'
    });

    if(admin) return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action: admin required.');
};
