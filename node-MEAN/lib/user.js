


exports.userInfo = function (req, res, next) {
	res.send({
			code: '200',
			msg: 'success',
			data: user
	});
};