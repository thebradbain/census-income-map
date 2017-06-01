/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

async function login(req, res) {
	let username = req.body.username;
	let password = req.body.password;

	let user = await User.findOne({
		username: username,
		password: password
	});

	if(user) {
		delete user.password;
		req.session.user = user;
		req.session.authenticated = true;
		res.redirect('/admin');
	} else {
		res.badRequest();
	}
}

async function logout(req, res) {
	delete req.session.user;
	req.session.authenticated = false;

	res.ok();
}

function admin(req, res) {
	return res.view('user/admin.ejs');
}

module.exports = {
	admin: admin,
	login: login,
	logout: logout
};
