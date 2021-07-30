## 入门

### 原理
将不同的项目包上传至minIO存储，利用whistle将线上项目地址代理至存储系统内相关文件。

### 场景

+ 子应用的某个版本需要 在某个环境调试
+ 多个子应用的多个版本需要 在某个环境联调
+ 发布某个子应用版本给别的开发使用（可临时当做前端金丝雀看待）

### 安装

::: tip 
下文演示在chrome中使用方法，在windows/mac/ios/android中使用方法请自行查看[文档](http://wproxy.org/whistle/install.html)

:::

#### 1.安装并启动whistle

`npm install -g whistle` & `w2 start -p 18899`（端口自选）

#### 2.安装并新增SwitchyOmega情景模式
> 首次安装可参考[资料下载](#switchyomega)章节

![新增情景模式](/switchOmega.png)


### 使用
<br>

#### 1.注册项目
> 仅第一次需要，项目名称为`vue.config.js`中的`publicPath`的二级目录（<span style="color:red;">不要加 / </span>）。

![新建项目1](/createProject1.png)

![新建项目2](/createProject2.png)

#### 2.上传打包后项目包
> 打包后的`dist`文件夹直接压缩成<span style="color:red;">zip</span>格式后上传

![上传打包后项目包1](/createPublishLog1.png)

![上传打包后项目包2](/createPublishLog2.png)

#### 3.复制代理脚本&粘贴至whistle中
> 可自行调整代理脚本内容

![复制脚本](/copyScript.png)

![粘贴至whistle](/pasteScript.png)

#### 4.开启SwitchyOmega
> 不使用时建议关闭

![启用SwitchyOmega](/startProxy.png)

#### 5.刷新页面

![效果](/result.png)

### 使用（CLI工具）
> 一条命令完成项目打包、压缩、上传、代理工具检测&开启、代理脚本注入

#### 1.安装
`npm i -g whistle @winex-proxy-cli/cli`

#### 2.使用

版本：`wp -v`

帮助：`wp -h`

打包项目并上传：`wp deploy -m 备注`

跳过打包直接上传：`wp deploy -s build -m 备注`


## 代码仓库

### CLI

[https://github.com/winex-proxy/winex-proxy-cli](https://github.com/winex-proxy/winex-proxy-cli)
### 后端

[https://github.com/winex-proxy/winex-proxy-server](https://github.com/winex-proxy/winex-proxy-server)

### 前端

[https://github.com/winex-proxy/winex-proxy-web](https://github.com/winex-proxy/winex-proxy-web)

### whistle

[https://github.com/avwo/whistle](https://github.com/avwo/whistle)

## 资料下载

### SwitchyOmega

[方式一：chrome网上商店](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)

[方式二：本地安装下载地址](https://github.com/FelisCatus/SwitchyOmega/releases/download/v2.5.20/SwitchyOmega_Chromium.crx)
