# `NestTodo`

待办事项 `RESTful APIs` ，技术上使用 `Nest.js` 、`JWT` 、`MongoDB` 、`Mongoose` ，功能上实现注册、登录、待办事项增删改查。

前端部分在 [angular-todo](https://github.com/TangJinJian/angular-todo) 里。

## 目录说明

- `/src/common` 公用的模块
- `/src/feature ` 业务模块

## 使用说明

```bash
# 打开项目目录
cd nest-todo

# 安装依赖。如果是在 Linux 下开发，请使用 sudo npm i，因为 bcrypt 的安装需要权限，所以需要使用 sudo
$ npm i

# 创建 todo-mongo
# 如果不会 docker ，可以按照自己的方法，自行创建数据库
$ docker run --name todo-mongo -d -p 27017:27017 mongo:4.2.1

# 我启动 Webpack 热更新
$ webpack:hmr

# 再启动这个，然后就可以啦
$ start:hmr
```


## `RESTful APIs`

### `/auth`

#### 获取 `Token`

```json
GET /auth/token
account: <用户>
password: <密码>
```

```json
200 OK

{
	"token": "<token>"
}
```

### `/users`

#### 创建一个用户

```json
POST /users
Content-Type: application/json

{
    "account": "<账号>",
    "password": "<密码>"
}
```

```json
200 OK

{
    "token": "<token>"
}
```

### `/todos`

#### 创建一个待办事项


```json
POST /todos
Content-Type: application/json
Authorization: Bearer <token>

{
	"todo": "<待办事项内容>"
}
```

```json
200 OK

{
    "_id": "<待办事项的_id>"
}
```

#### 删除一个待办事项

```json
DELETE /todos/:_id
Authorization: Bearer <token>
```

```json
204 No Content
```

#### 改变一个待办事项

```json
PATCH /todos/:_id
Content-Type: application/json
Authorization: Bearer <token>

{
    "complete"?: <true | false>,
    "todo"?: "<待办事项内容>"
}
```

```json
204 No Content
```

#### 查询一些待办事项

```json
GET /todos
Authorization: Bearer <token>
```

```json
200 OK

[
    { _id: "<待办事项_id>", "complete": <true | false>, "todo": "<待办事项内容>" },
    { _id: "<待办事项_id>", "complete": <true | false>, "todo": "<待办事项内容>" },
    ...
]
```

## `Docker` 部署

```bash
# 克隆代码
git clone https://github.com/TangJinJian/nest-todo.git

# 打开目录
cd nest-todo

# 安装依赖，请在 Linux 环境下编译安装，因为 Docker Node.js 容器是 Linux 环境
# Node.js 容器目标平台是 Linux ，所以 bcrypt 编译的目标平台，也必须是 Linux
# bcrypt 的安装，需要权限，所以需要使用 sudo
sudo npm i

# 编译生产环境代码
npm run prestart:prod

# 编译镜像
docker build --rm -f "Dockerfile" -t tangjinjian/nest-todo:1.0.3 .

# 运行服务
# 你必须先修改 
docker-compose up -d
```

