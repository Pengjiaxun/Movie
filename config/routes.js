var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')


module.exports = function(app) {
	// pre handle user
	app.use(function(req, res, next) {
		var _user = req.session.user
		app.locals.user = _user
		next()
	})

	// Index
	app.get('/', Index.index)

	// User
	app.post('/user/signup', User.signup)
	app.post('/user/signin', User.signin)
	// app.get('/signin', User.showSignin)
	// app.get('/signup', User.showSignup)
	app.get('/logout', User.logout)
	app.get('/admin/userlist', User.list)

	// Movie
	app.get('/admin/new', Movie.new)
	app.get('/movie/:id', Movie.detail)
	// app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new)
	app.get('/admin/movie/update/:id', Movie.update)
	app.post('/admin/movie', Movie.save)
	app.get('/admin/movie/list', Movie.list)
	app.delete('/admin/movie/list', Movie.del)

	// Comment
	// app.post('/user/comment', User.signinRequired, Comment.save) //来自detail.js的评论提交

	//category
	// app.get('/admin/category/new',User.signinRequired, User.adminRequired, Category.new)
	// app.post('/admin/category',User.signinRequired, User.adminRequired, Category.save)
	// app.get('/admin/category/list',User.signinRequired, User.adminRequired, Category.list)

	//results
	// app.get('/results', Index.search)
}