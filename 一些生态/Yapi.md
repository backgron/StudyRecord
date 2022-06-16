## 我的环境：

+ mongodb 5

+ node 12

+ npm 6
+ yapi 1.10.2

## 配置数据库:

+ ```shell
  # 进入mongo的 yapi 数据库  （没有会自动创建）
  use yapi
  # 创建yapi连接数据库使用的用户   要设置 readWrite 权限在 yapi 数据库
  db.createUser({user:"yapiUser",pwd:"yapiUser",roles:[{role:"readWrite",db:"yapi"}]})
  # 查看是否创建成功
  db.auth("yapiUser","yapiUser")
  # 返回 1 则为创建成功
  ```

## 配置yapi

+ ```shell
  npm install -g yapi-cli --registry https://registry.npm.taobao.org
  yapi server
  ```

+ 打开 127.0.0.1:9090  (切换ip)

+ 根据页面提示创建数据库

+ 登录 127.0.0.1:3000 (用自选端口 默认为3000)

+ 成功

## 遇到的主要问题

+ node版本不匹配，出现很多包无法找到
+ mongo 用户权限配置不对

## 官方教程

[内网部署 (hellosean1025.github.io)](https://hellosean1025.github.io/yapi/devops/index.html)