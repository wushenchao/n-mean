/**
 * config
 */

var config = {
	debug: true,

	session_secret: 'node_mean_test',

	db: 'mongodb://127.0.0.1/node_mean_dev',

	host: 'localhost',
	// 程序运行端口
	port: 8080,
};


if (process.env.NODE_ENV === 'test') {
	config.db = 'mongodb://127.0.0.1/node_mean_test';
}

module.exports = config;