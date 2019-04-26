
const GROUP_NAME = 'shops';

const  { paginationDefine } = require('../utils/router-helper');
// 引入models
const models = require('../models');
module.exports = [
{
	method: 'GET',
	path: `/${GROUP_NAME}`,
	handler: async (request, reply) => {
		const {rows: results, count: totalCount } = await models.shops.findAndCountAll({
			attributes: [
				'id',
				'name'
			],
			limit: request.query.limit,
			offset: (request.query.page - 1) * request.query.limit
		});
		// 开启分页的插件，返回的数据结构里，需要带上result与totalCount两个字段
		reply({results, totalCount});
	},
	config: {
		tags: ['api', GROUP_NAME],
		description: '获取店铺列表',
		validate: {
			query: {
				...paginationDefine
			}
		},
		auth: false
	}
}, {
	method: 'GET',
	path: `/${GROUP_NAME}/{shopId}/goods`,
	handler: async(request, reply) => {
		reply();
	},
	config: {
		tags: ['api', GROUP_NAME],
		description: '获取店铺的商品列表'
	}
}]