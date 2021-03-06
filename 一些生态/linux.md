# Linux

下面以`CentOS 7`举例

## 目录结构

- **/bin**：bin是Binary的缩写, 这个目录存放着最经常使用的命令。
- **/boot：** 这里存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
- **/dev ：** dev是Device(设备)的缩写, 存放的是Linux的外部设备，在Linux中访问设备的方式和访问文件的方式是相同的。
- **/etc：** 这个目录用来存放所有的系统管理所需要的配置文件和子目录。
- **/home**：用户的主目录，在Linux中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。
- **/lib**：这个目录里存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件。
- **/lost+found**：这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
- **/media**：linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
- **/mnt**：系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。
- **/opt**：这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。
- **/proc**：这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
- **/root**：该目录为系统管理员，也称作超级权限者的用户主目录。
- **/sbin**：s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。
- **/srv**：该目录存放一些服务启动之后需要提取的数据。
- **/sys**：这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
- **/tmp**：这个目录是用来存放一些临时文件的。
- **/usr**：这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。
- **/usr/bin：** 系统用户使用的应用程序。
- **/usr/sbin：** 超级用户使用的比较高级的管理程序和系统守护程序。
- **/usr/src：** 内核源代码默认的放置目录。
- **/var**：这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
- **/run**：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。

## 基本命令

### 目录相关

- **ls**: 列出目录

- **cd**：切换目录

- **pwd**：显示目前的目录

- **mkdir**：创建一个新的目录

- **rmdir**：删除一个空的目录

- **cp**: 复制文件或目录

  ```shell
  -a：相当於 -pdr 的意思，至於 pdr 请参考下列说明；(常用)
  -p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；
  -d：若来源档为连结档的属性(link file)，则复制连结档属性而非文件本身；
  -r：递归持续复制，用於目录的复制行为；(常用)
  -f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；
  -i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)
  -l：进行硬式连结(hard link)的连结档创建，而非复制文件本身。
  -s：复制成为符号连结档 (symbolic link)，亦即『捷径』文件；
  -u：若 destination 比 source 旧才升级 destination ！
  ```

- **rm**: 移除文件或目录

- **mv**: 移动文件与目录，或修改文件与目录的名称

### 文件内容相关

- **cat** 由第一行开始显示文件内容
- **tac** 从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
- **nl**  显示的时候，顺道输出行号！
- **more** 一页一页的显示文件内容
- **less** 与 `more` 类似，但是比 `more` 更好的是，他可以往前翻页！
- **head** 只看头几行
- **tail** 只看尾巴几行

### 文件连接

+ **ln f1 f2**     创建f1的一个硬连接文件f2
+ **ln -s f1 f3**    创建f1的一个符号连接文件f3

## Vim 基本用法

+ **vim filename**  通过`vim`打开文件
+ **esc键**  切换命令模式/输入模式

### 命令模式

- **i** 切换到输入模式，以输入字符。
- **x** 删除当前光标所在处的字符。
- **:** 切换到底线命令模式，以在最底一行输入命令。

### 输入模式

- **字符按键以及Shift组合**，输入字符
- **ENTER**，回车键，换行
- **BACK SPACE**，退格键，删除光标前一个字符
- **DEL**，删除键，删除光标后一个字符
- **方向键**，在文本中移动光标
- **HOME**/**END**，移动光标到行首/行尾
- **Page Up**/**Page Down**，上/下翻页
- **Insert**，切换光标为输入/替换模式，光标将变成竖线/下划线
- **ESC**，退出输入模式，切换到命令模式

### **底线命令模式**

- **q** 退出程序
- **w** 保存文件

## 磁盘管理

- **df** ：列出文件系统的整体磁盘使用量
- **du**：检查磁盘空间使用量

### df

``` shell
df [-a..] dir/fileName
```

- **-a** ：列出所有的文件系统，包括系统特有的 `/proc` 等文件系统；
- **-k** ：以 `KBytes` 的容量显示各文件系统；
- **-m** ：以 `MBytes` 的容量显示各文件系统；
- **-h** ：以人们较易阅读的 `GBytes`, `MBytes`, `KBytes` 等格式自行显示；
- **-H** ：以 `M=1000K` 取代 `M=1024K` 的进位方式；
- **-T** ：显示文件系统类型, 连同该 `partition` 的 `filesystem` 名称 (例如 `ext3`) 也列出；
- **-i** ：不用硬盘容量，而以 `inode` 的数量来显示

### du

- **-a** ：列出所有的文件与目录容量，因为默认仅统计目录底下的文件量而已。
- **-h** ：以人们较易读的容量格式 (G/M) 显示；
- **-s** ：列出总量而已，而不列出每个各别的目录占用容量；
- **-S** ：不包括子目录下的总计，与 `-s` 有点差别。
- **-k** ：以 `KBytes` 列出容量显示；
- **-m** ：以 `MBytes` 列出容量显示；

## 网络/端口

### 网络

+ **ip addr** 查看`ip`和`网卡`
+ **ifconfig** 用于查看和更改网络接口的地址和参数，包括IP地址、网络掩码、广播地址，使用权限是超级用户

### 端口

+ **netstat** 显示`tcp`、`udp`的`端口`和`进程`相关情况

  ```shell
  -t # tcp
  -u # udp
  -n # 拒绝显示别名，能显示数字的全部转化为数字
  -i # 仅列出再Linsten的服务
  -P # 显示建立相关链接的程序名
  netstat -tunlp|grep 80 # 查看80端口情况
  ```

+ **kill -9 PID** 杀死一个端口对应的进程

## 参考文章

**狂神说微信公众号**：https://mp.weixin.qq.com/s/RT93qJdTagtKjWKx_A_6Nw

## 常用总结

```shell
cd [file]  # 进入文件夹，可以说相对路径，也可以是绝对路径，更路径为 /
ls [-l -a] # 列出当前目录内容 [详细信息 全部文件]
pwd		# 显示当前目录
mkdir [-p -m]	# 创建新文件夹（目录） [递归创建 配置权限]
rmdir [-p -f] # 删除文件夹（目录） [-递归删除 -强行删除]
cp [options] 源file 目标file # 复制源文件到目标文件 [options见上方]
rm [-r -f -i]      # 删除文件或者目录  [递归删除 强行删除 互动删除]
mv [-u -f -i] 源file 目标path  # 移动源文件到目标文件  同一路径可以起到改文件名效果 [更新 强行覆盖 互动覆盖]

cat filename  # 由第一行开始显示文件内容
nl 	filename  # 显示行号
more filename  # 一页一页显示文件内容
less filename	 # 可以前后翻页
head [-n number] filename # 只看前n行 [-n 行数]
tail [-n number] filename # 只看后n行 [-n 行数]

ln f1 f2 	  # 创建f1的一个硬连接文件f2
ln -s f1 f3   # 创建f1的一个符号连接文件f3
```

