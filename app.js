var express = require('express')
var morgan = require('morgan')
var path = require('path')
var mongoose = require('mongoose')

mongoose.Promise = global.Promise
var _ = require('underscore')
var Movie = require('./app/models/movie')
var User = require('./app/models/user')
var port = process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://localhost/movie'

mongoose.connect(dbUrl)

var bodyParser = require(('body-parser'))
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var multipart = require('connect-multiparty');
app.use(multipart());
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(cookieParser())
app.use(cookieSession({
	secret: 'imooc',
	store: new MongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}))

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended: true}))

if('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
}

require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('service start on port:' + port)