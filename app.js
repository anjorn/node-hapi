require('env2')('./.env');
const Hapi = require('hapi');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-world');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');
// 引入自定义的hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
// 引入自定义的hapi-pagination 插件配置
const pluginHapiPagination = require('./plugins/hapi-pagination');
// 注册hapi-auth-jwt2插件
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');
const server = new Hapi.Server();
// 配置服务器启动host与端口
server.connection({
	port: config.port,
	host: config.host
});

const init = async () => {
	await server.register([
		// 为系统使用hapi-swagger
		...pluginHapiSwagger,
		pluginHapiPagination,
		hapiAuthJWT2
	]);
	pluginHapiAuthJWT2(server);
	server.route([
		...routesHelloHapi,
		...routesShops,
		...routesOrders,
		...routesUsers
	]);
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
};

init();
