const config = require('../config');

const validate = (decoded, request, callback) => {
	let error;
	// decoded为JWT payload被解码后的数据
	const {userId} = decoded;

	if (!userId) {
		return callback(error, false, userId);
	}
	const credentials = {
		userId
	};
	// 在路由接口的handler 通过 request.auth.credentials 获取jwt decoded的值
	return callback(error, true, credentials);
};

module.exports = (server) => {
	server.auth.strategy('jwt', 'jwt', {
		// 需要自行在config/index.js中添加jwtSecret的配置，并且通过process.env.JWT_SECRET
		key: config.jwtSecret,
		verifyFunc: validate
	});
	server.auth.default('jwt');
}