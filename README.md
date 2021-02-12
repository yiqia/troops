# 部队成绩管理系统
## 项目介绍
    开发工具：WebStorm
    框架：vue,express,element-ui
    数据库：mongodb
    环境：node.js,mongodb
## 项目安装
首先需要安装node.js和mongodb，自行官网下载和安装
随后在根目录运行安装命令

```
npm install
```

## 项目配置

/main.js 里修改后端接口地址

/server 为服务端文件夹

/server/index.js 修改端口

```js
app.listen(3001,()=>{
    console.log('http://localhost:3001/')
})
```

/server/config/mongodb.js 修改数据库配置

```js
const query = mongoose.connect('mongodb://localhost:27017/troops',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
```

### 项目前端启动

根目录运行

```
npm run serve
```

### 项目前端线上版本打包

根目录运行

```
npm run build
```

## 后端运行

/server 目录下运行安装命令

```
npm install
```

/server 目录下运行命令  若服务端搭建后端 需要使用pm2添加运行

```
node index.js
```

## 常见问题

### 遇到后端启动后无法访问

1. 检查依赖是否安装完毕 可上服务器执行node index.js看返回的正确还是错误，若错误会提示没有安装的依赖包

2. 检查端口是否开放，宝塔以及服务器控制台都需要防火墙中开放端口。

