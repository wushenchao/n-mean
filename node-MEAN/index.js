/**
 *  Module dependencies.
 */

var config = require('./config');

var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var compress = require('compression');
var helmet = require('helmet');
var LoaderConnet = require('loader-connect');
var apiRouter = require('./api_router');


var staticDir = path.join(__dirname, 'public');
var urlinfo = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var logger = require('./common/logger');
var requestLog = require('./middlewares/request_log');
var renderMiddleware = require('./middlewares/render');

//  mongodb
require('./middlewares/mongoose_log');


var app = express();

// request logger
app.use(requestLog);

if (config.debug) {
	app.use(renderMiddleware.render);
	app.use(LoaderConnet.less(__dirname)); // 测试环境用，编译 .less on the fly
}

app.use('/public', express.static(staticDir));

// 通用的中间件
app.use(require('response-time')());
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true,
}));

// error handler
if (config.debug) {
  app.use(errorhandler());
}
else {
  app.use(function (err, req, res, next) {
    logger.error(err);
    return res.status(500).send('500 status');
  });
}

app.use('/', apiRouter);

/* istanbul ignore next */
if (!module.parent) {
	app.listen(config.port, function(){
		logger.info('NodeClub listening on port', config.port);
		logger.info('God bless love....');
		logger.info('');
	});
}

module.exports = app;
