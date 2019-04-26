const JWT = require('jsonwebtoken');

const  { wxLoginDefine } = require('../utils/router-helper');
const decryptData = require('../utils/decrypted-data');
const GROUP_NAME = 'users';
const axios = require('axios');
const config = require('../config');
// JWT的签发实现
module.exports = [{
	method: 'POST',
	path: `/${GROUP_NAME}/createJWT`,
	handler: async (request, reply) => {
		const generateJWT = (jwtInfo) => {
			const payload = {
				userId: jwtInfo.userId,
				exp: Math.floor(new Date().getTime() / 1000) + 7*24*60*60
			};
			return JWT.sign(payload, process.env.JWT_SECRET);
		};
		reply(generateJWT({
			userId: 1
		}));
	},
	config: {
		tags: ['api', GROUP_NAME],
		description: '用于测试的用户JWT签发',
		auth: false // 约定此接口不参与JWT的用户验证，会结合下面的hapi-auth-jwt来使用
	}
}, {
	method: 'POST',
	path: `/${GROUP_NAME}/wxLogin`,
	handler: async (request, reply) => {
		const appid = config.wxAppid;
		const secret = config.wxSecret;
		const { code, encryptedData, iv } = request.payload;

		const response = await axios({
			url: 'htpps://api.weixin.qq.com/sns/jscode2ssesion',
			method: 'GET',
			params: {
				appid,
				secret,
				js_code: code,
				grant_type: 'authorization_code'
			}
		});
		// response中返回openid与session_key
		const { openid, session_key: sessionKey } = response.data;
		// 基于openid查找或创建一个用户
		const user = await models.users.findOrCreate({
			where: { open_id: openid }
		});

		// decrypt 解码用户信息
		const userInfo = decryptData(encryptedData, iv, sessionKey, appid);
		// 更新user表中的用户的资料信息
		await models.users.update({
			nick_name: userInfo.nickName,
			gender: userInfo.gender,
			avatar_url: userInfo.avatarUrl,
			open_id: openid,
			session_key: sessionKey
		}, {
			where: { open_id: openid }
		});
		// 签发jwt
		const generateJWT = (jwtInfo) => {
			const payload = {
				userId: jwtInfo.userId,
				exp: Math.floor(new Date().getTime() / 1000) + 7*24*60*60
			};
			return JWT.sign(payload, process.env.JWT_SECRET);
		};
		reply(generateJWT({
			userId: user[0].id
		}));
		// 根据userID去查询具体的业务
	},
	config: {
		auth: false, // 不需要用户验证
		tags: ['api', GROUP_NAME], // 注册swagger文档
		description: '登录',
		validate: {
			...wxLoginDefine
		} 
	}
}]