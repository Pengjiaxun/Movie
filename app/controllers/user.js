var User = require('../models/user')

exports.showSignup = function(req, res) {
	res.render('signup', {
		title: '注册页面'
	})
}
exports.showSignin = function(req, res) {
	res.render('signin', {
		title: '登录页面'
	})
}
// signup注册
exports.signup = function(req, res) {
	var _user = req.body.user
	// req.param('user')
	var user = new User(_user)
	User.findOne({name: _user.name}, function(err, user) {
		if(err) {
			console.log(err)
		}
		// 若注册的用户已存在，重定向至登录页面
		if(user) {
			return res.redirect('/signin')
		}else {
			var user = new User(_user)
			user.save(function(err, user) {
				if(err) {
					console.log(err)
				}
				res.redirect('/')
			})
		}
	})
}

// signin登录
exports.signin = function(req, res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password
	User.findOne({name: name}, function(err, user) {
		if(err) {
			console.log(err)
		}
		// 若登录的用户不存在，重定向至注册页面
		if(!user) {
			return res.redirect('/signup')
		}
		user.comparePassword(password, function(err, isMatch) {
			if(err) {
				console.log(err)
			}
			if(isMatch) {
				req.session.user = user
				return res.redirect('/')
			}else {
				return res.redirect('/signin')
			}
		})
	})
}

// logout
exports.logout = function(req, res) {
	delete req.session.user
	// delete app.locals.user
	res.redirect('/')
}

// userlist page
exports.list = function(req, res) {
	User.fetch(function(err, users) {
		if(err) {
			console.log(err)
		}
		res.render('userlist', {
			title: '用户列表页',
			users: users
		})
	})
}

// midware
exports.signinRequired = function(req, res, next) {
	var user = req.session.user
	if(!user) {
		return res.redirect('/signin')
	}
	next()
}

// midware
exports.adminRequired = function(req, res, next) {
	var user = req.session.user
	if(user.role <= 10) {
		return res.redirect('/signin')
	}
	next()
}
