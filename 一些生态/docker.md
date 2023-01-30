# Docker

## 基本命令

+ **systemctl start docker**  启动docker
+ **docker version**  查看版本
+ **systemctl enable docker** 开机自启动
+ **docker info** 查看系统信息

##  镜像命令

+ **docker images**  查看所有镜像
+ **docker search** 搜索镜像
+ **docker pull [imageName:tag]** 下载镜像
+ **docker rmi [-f] [imageId]** 删除镜像 [强制删除]

## 容器命令

+ docker run [options]  image 运行容器

  ```shell
  --name='名称'    # 指定容器名称
  -d			    # 后台运行
  -it				# 使用交互方式运行（进入容器内）
  -p 主机端口:容器端口 # 指定容器的端口映射
  -P 				 # 随机指定端口
  -v 主机端口:容器端口 # 指定容器数据卷，绑定文件
  ```

+ **exit** 退出容器

+ **dockers ps [options]** 列出容器

  ```shell
  dockers ps  # 列出正在运行容器
  -a	# 列出所有容器的运行记录
  -n=[number]  # 列出最近的n个容器
  -q		# 只显示容器ID
  ```

+ **docker rm [options] 容器id** 删除指定容器

  ```shell
  -f # 强制删除
  docker rm -f $(docker ps -aq) # 删除所有容器
  docker ps -a -q|xargs docker rm # 删除所有容器
  ```

+ **docker start 容器id** 启动容器

+ **docker restart 容器id** 重启容器

+ **docker stop 容器id** 停止当前运行容器

+ **docker kill 容器id** 强制停止当前容器

+ **docker exec ** 开启新的终端，进入容器

  ```shell
  docker exec -it 容器id /bin/bash
  ```

+ **docker attach** 进入容器正在进行的终端

  ```shell
  docker attach 容器id
  ```

## 其他命令

+ **docker logs** 查看日志

+ **docker top** 容器id 查看进程信息

+ **docker inspect 容器id** 查看元数据

+ **docker cp 容器id:容器内路径 目的主机路径** 拷贝容器的文件到主机中（在主机操作）

+ **docker commit [options] [容器id] [ImageName:Tag]** 打包一个镜像

  ```shell
  -a # 作者
  -c # 使用Dockerfile指令创建镜像
  -m # 提交时的说明文字
  -p # 在commit时，将容器暂停
  ```

+ **docker volume --help** 查看卷相关命令

+ **docker --volume-from** 数据卷容器，从另一个容器当中挂载容器中已经创建好的数据卷

## Dockerfile

+ **docker build .**    通过dockerfile构建镜像

```dockerfile
FROM centos # 指定基础镜像
MAINTAINER backgron<backgron@163.com> # 作者
RUN yum install vim # 构建时候需要运行的命令
ADD xxx # 将本地文件添加到容器中
WORKDIR /usr/local # 镜像的工作目录
VOLUME ['vol'] # 挂载目录
EXPOSE 80 # 暴露的端口
CMD /bin/bash # 指定容器启动时执行的命令 只有最后一个生效
ENTRYPOINT /bin/bash # 指定容器启动时执行的命令，可以追加
ONBUILD xxx # 当构建一个被继承Dockerfile 这个时候就回运行ONBUILD
COPY nginx.conf /etc/nginx/config # 添加本地文件
ENV MYPATH /etc/nginx # 构建的时候设置环境变量
```

## 镜像发布与下载

+ **docker login -u username -p** 登录
+ **docker logout** 退出
+ **docker pull 镜像名** 下载
+ **docker push 镜像名** 发布

## Docker网络

+ **docker0** 默认网络

+ **docker network ** 网络相关

  ```shell
  connect # 将容器连接到网络
  disconnect # 
  inspect [网络名/网络ID] # 详情
  ls # 展示网络信息
  create # 创建一个自定义网络
  	--driver bridge  # 指定bridge驱动程序来管理网络
  	--subnet 192.168.0.0/16 # 指定网段的CIDR格式的子网
  	--gatway 192.168.0.1 # 指定主子网的IPv4或IPv6网关
  ```

+ **docker run --net 网络名**创建容器时指定网络

  ```shell
  docker run --net 
  ```

## Docker Compose

+ **docker-compose up** 执行docker-compose

+ **docker-compose down** 关闭docker-compose文件

+ **docker-compose.yml**

  ```yaml
  version: '3'
  services:
    web:
      build: .
      ports:
       - "5000:5000"
      volumes:
       - logvolume01:/var/log
      links:
       - redis
    redis:
      image: redis
  volumes:
    logvolume01: {}
  ```

  


## 搭建docker私服

### 安装官方私有仓库镜像
```shell
  docker run -d \
  -p 5000:5000 \
  -v /usr/local/registry:/var/lib/registry \
  registry
```
### 配置客户端
``` shell
  vim /usr/lib/systemd/system/docker.service

  在 ExecStart= 后面添加 --insecure-registry ip：5000

  vim /etc/docker/daemon.conf 添加如下内容：
  {
    "insecure-registries":["xxxxip:5000"]
  }
```
### 重启docker服务
```shell
  systemctl daemon-reload
  systemctl restart docker
```
注意重启docker服务后重启私有仓库的容器

### 推送
docker tag IMAGE 服务器ip:端口/IMAGE_NAME
docker push 服务器ip:端口/IMAGE_NAME

### 拉取
docker pull 服务器ip:端口/IMAGE_NAME