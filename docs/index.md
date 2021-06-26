## 入门

> 原理：将不同的项目包上传至minIO存储，利用whistle将线上项目地址代理至存储系统内相关文件。

### 安装

::: tip 
下文演示在chrome中使用方法，在windows/mac/ios/android中使用方法请自行查看[文档](http://wproxy.org/whistle/install.html)

:::

#### 1.安装并启动whistle

`npm install -g whistle`

#### 2.启动whistle
`w2 start -p 18899`（端口自选）

#### 3.安装并新增SwitchyOmega情景模式
> 首次安装可参考`资料下载`章节

![新增情景模式](/switchOmega.png)


### 使用
<br>

#### 1.注册项目
> 仅第一次需要，项目名称为vue.config.js中的publicPath的二级目录。

![新建项目1](/createProject1.png)

![新建项目2](/createProject2.png)

#### 2.上传打包后项目包
> 打包后的dist文件夹直接压缩成zip格式后上传

![上传打包后项目包1](/createPublishLog1.png)

![上传打包后项目包2](/createPublishLog2.png)

#### 3.复制代理脚本&粘贴至whistle中
> 可自行调整代理脚本内容

![复制脚本](/copyScript.png)

![粘贴至whistle](/pasteScript.png)

#### 4.启用SwitchyOmega

![启用SwitchyOmega](/startProxy.png)

#### 5.刷新页面

![效果](/result.png)


## 资料下载

### SwitchyOmega

[方式一：chrome网上商店](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)

[方式二：本地安装下载地址](https://github.com/FelisCatus/SwitchyOmega/releases/download/v2.5.20/SwitchyOmega_Chromium.crx)



## 代码仓库

### 后端

[https://github.com/winex-proxy/winex-proxy-server](https://github.com/winex-proxy/winex-proxy-server)

### 前端

[https://github.com/winex-proxy/winex-proxy-web](https://github.com/winex-proxy/winex-proxy-web)

### whistle

[https://github.com/avwo/whistle](https://github.com/avwo/whistle)
