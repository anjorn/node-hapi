# 学习笔记

学习掘金小册《基于hapi的Node.js小程序后端开发实践指南》学习笔记

## 前期准备

* node轻量 Express框架 koa框架

* hapi是web应用程序的开源框架
* 

## 学习内容

外卖业务的后端系统，进行RESTful接口设计

项目工程化设计原则

* 单业务模块化
* 模块二百行原则
* 同类模块分组化
* 配置文件分离
* 

## 基础项目工程搭建

**1. 初始化Node.js项目**

```js
npm init
```

**2. 安装hapi模块**

使用hapi的v16版本

```js
npm i hapi@16
```

**3. 最基础的hapi服务代码**

创建app.js文件作为服务的启动入口

**4.启动hapi服务**

```js
node app.js
# 或者希望在编辑完源代码后，服务自动重启，使用supervisor
supervisor app.js
可能遇到的问题 node 版本太低 启动报错 升级node
```

**5.验证hapi服务**

打开浏览器，访问http://127.0.0.1:3030我们将看到浏览器中看到 hello hapi的字样

## 重构步骤

**1.重新梳理项目工程目录**

```js
.
├── config              // 项目配置目录
│   ├── index.js        // 配置项目中的配置信息
├── models              // 数据库 model
├── node_modules        // node.js依赖目录
├── plugins             // 插件目录
│   ├── hapi-swagger.js // swagger插件
├── routes              // 路由目录
│   ├── hello-world.js  // 测试接口 hello-world
├── utils               // 工具类相关目录
├── app.js              // 项目入口文件
├── package.json        // js 项目工程依赖库
├── readme.md           // 项目工程如何被使用的说明手册
```

**2.分离路由配置**

**3.分离config基础参数配置**

**4.关联config与route路由模块**



## 使用swagger文档

###### 安装基础依赖于基础插件配置

```js
npm i hapi-swagger@7
npm i inert@4
npm i vision@4
npm i package
```

## 使用Joi校验数据结构

###### 安装Joi依赖库

```js
npm i joi@13
```

**1. 适用于动态理由的params验证**

**2.适用于POST接口的payload(request body)验证**

**3.适用于GET接口的query(URL路径参数)**

**4.适用于header额外字段约束的headers验证**

## 数据库

### 操作指令

1. show database;
2. use test;
3. show tables;
4. desc orders （显示表结构）

#### 前置条件

1. 安装数据库 mysql
2. Sequelize 是node.js中基于promise数据库ORM插件 提供大量数据库增删改查的函数式API
3. MySQL2插件 连接 Sequelize 和 MySQL

#### 步骤

1. 数据库创建 sequelize db:create
2. migrate数据迁移 数据表创建 sequelize migration:create  sequelize db:migrate  sequelize migration:create --name add-columns-to-shops-table
3. 初始化基础数据 sequelize seed:create --name init-shops sequelize db:seed all 向数据库填充seeders目录中所有up方法所定义的数据

#### 遇到的问题

1. 数据库sequelize db:create 报错Client does not support authentication protocol requested by server; consider upgrading MySQL client 需要启动mysql 并输入命令ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_new_password'; 切记已分号结束 以启动数据库
2. sequelize db:seed all 报错  Validation error 未解决

## 业务开发 分页

**hapi-pagination**

## 身份验证设计JWT流程

**1. 用户使用用户名密码，或第三方授权登录后，请求应用服务器**

**2. 服务器验证用户信息是否合法**

**3. 对通过验证的用户，签发一个包涵用户ID，其他少量用户信息以及失效时间的JWT token**

**4. 客户端存储JWT token，并在调用需要身份验证的接口服务时，带上这个JWT token值**

**5. 服务器验证JWT token的签发合法性，失效性，验证通过后，返回业务数据**

## 身份验证步骤

**1 安装插件** 生成jst密钥 添加在header中authorization

npm i jsonwebtoken

**2. 安装hapi-auth-jwt2插件**

npm i hapi-auth-jwt2@7

## 事务处理

* 托管事务 基于promise结果链进行自动提交或回滚
* 非托管事务 由用户自行控制提交或回滚

​      sequelize.transaction 跑出异常 所有关于数据库中的操作都将被回滚                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

## 效果

## License

MIT



