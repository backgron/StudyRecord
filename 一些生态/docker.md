# Docker

## 基本命令

+ **systemctl start docker**  启动docker
+ **docker version**  查看版本
+ **systemctl enable docker ** 开机自启动
+ **docker info** 查看系统信息

##  镜像命令

+ **docker images**  查看所有镜像
+ **docker search ** 搜索镜像
+ **docker pull [imageName:tag]** 下载镜像
+ **docker rmi [-f] [imageId]** 删除镜像 [强制删除]

## 容器命令

+ docker run [options]  image 运行容器

  ```shell
  --name='名称'    #指定容器名称
  -d			    #后台运行
  -it				#使用交互方式运行（进入容器内）
  -p 主机端口:容器端口 #指定容器的端口映射
  -P 				 #随机指定端口
  
  ```

+ **exit** 退出容器

+ **dockers ps [options]** 列出容器

  ```shell
  dockers ps  #列出正在运行容器
  -a	#列出所有容器的运行记录
  -n=[number]  #列出最近的n个容器
  -q		#只显示容器ID
  ```

+ **docker rm [options] 容器id** 删除指定容器

  ```shell
  -f #强制删除
  docker rm -f $(docker ps -aq) #删除所有容器
  docker ps -a -q|xargs docker rm #删除所有容器
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
  docker exec 容器id
  ```

## 其他命令

+ **docker logs** 查看日志
+ **docker top** 容器id 查看进程信息
+ **docker inspect 容器id** 查看元数据
+ **docker cp 容器id:容器内路径 目的主机路径** 拷贝容器的文件到主机中（在主机操作）

### 参考文章

[Docker基础篇_霸气小闫的博客-CSDN博客](https://blog.csdn.net/Mr_YanMingXin/article/details/119504925)

