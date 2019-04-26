const Joi = require('joi');

// 分页公共配置
const paginationDefine = {
	limit: Joi.number().integer().min(1).default(10) 
		.description('每页的条目数'),
	page: Joi.number().integer().min(1).default(1)
		.description('页码数'),
	pagination: Joi.boolean().default(true).description('是否开启分页，默认为true')
};

// header入参校验
const jwtHeaderDefine = {
	headers: Joi.object({
		authorization: Joi.string().required()
	}).unknown()
}

// 微信登录信息校验
const wxLoginDefine = {
	payload: {
		code: Joi.string().required().description('微信用户登录的临时code'),
		encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
		iv: Joi.string().required().description('微信用户信息iv')
	}
}
module.exports = { paginationDefine, jwtHeaderDefine, wxLoginDefine };