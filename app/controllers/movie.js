var Movie = require('../models/movie')
var Comment = require('../models/comment')
var _ = require('underscore')


// detail page
exports.detail = function(req, res) {
	var id = req.params.id
	Movie.findById(id, function(err, movie) {
		Comment
			.find({movie: id})
			.populate('from', 'name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err, comments) {
				console.log(comments)
				res.render('detail', {
					title: 'Movie 详情页',
					movie: movie,
					comments: comments
				})
			})
		})
}

// admin page
exports.new = function(req, res) {
	res.render('admin', {
		title: 'Movie 后台录入页',
		movie: {
			title: '',
			director: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			lang: ''
		}
	})
}

// admin update movie
exports.update = function(req, res) {
	var id = req.params.id
	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'movie 后台更新页',
				movie: movie
			})
		})
	}
}

// admin post movie
exports.save = function(req, res) {
	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie = null

	if(id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err)
			}
			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if(err) {
					console.log(err)
				}
				res.redirect('/movie/' + movie._id)
			})
		})
	}else {
		_movie = new Movie({
			director: movieObj.director,
			title: movieObj.title,
			country: movieObj.country,
			lang: movieObj.lang,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})
		_movie.save(function(err, movie) {
			if(err) {
				console.log(err)
			}
			res.redirect('/movie/' + movie._id)
		})
	}
}

// list page
exports.list = function(req, res) {
	Movie.fetch(function(err, movies) {
		if(err) {
			console.log(err)
		}
		res.render('list', {
			title: 'Movie 列表页',
			movies: movies
		})
	})
}

// list delete movie
exports.del = function(req, res) {
	var id = req.query.id
	if(id) {
		Movie.remove({_id: id}, function(err, movie) {
			if(err) {
				console.log(err)
			}else {
				res.json({success: 1})				
			}
		})
	}
}