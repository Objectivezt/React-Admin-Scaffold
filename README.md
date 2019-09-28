# React Single Page Application Scaffold support multiTabPage

> Author: Objectivezt
> version: 0.7.0
> description: 基于 React 和 Ant Design 的单页应用多页签脚手架

## 技术栈介绍

1. 基础库 react
2. 数据流 dva.js

## 目录结构介绍

```
├── .vscode  IDE 代码基础配置
├── build   // 打包OPTION信息
├── dist   // 打包输入文件
├── mock    // mock数据文件夹
├── node_modules // 第三方的依赖
├── src  // 最重要的文件夹，编写代码都在这个文件夹下
│   ├── assets // 可以放图片等公共资源
│   ├── common // 公共组件数据
│   │   ├── globalUI // 对antd的公共封装
│   │   ├── i18N // 国际化文件配置
│   │   ├── baseRouterUrl.js // 国际化文件配置
│   │   ├── config.js // 基础配置
│   │   ├── localButton.js // 本地按钮
│   │   ├── localMenu.js  //本地菜单
│   │   ├── router.js  // 基础路由表
│   │   └── theme.js // 主题文件
│   ├── components // 系统react中基础组件
│   ├── containers // 页面组件
│   │   ├── DashBoard // 管理首页
│   │   ├── Exception // 异常页
│   │   ├── General // 通用业务组件
│   │   ├── Portal // 游客入口页
│   │   ├── Module // 库Demo
│   │   ├── Systems // 非业务组件
│   │   └── UI // UI组件DEMO
│   ├── layouts // layout模版
│   │   ├── AuthLayout // 后台管理通用模版
│   │       ├── GlobalFooter // 通用模版尾部
│   │       ├── GlobalHeader // 通用模版头部
│   │       └── SliderMenu // 菜单栏
│   │   ├── TouristLayout // 前台游客页通用模版
│   │   ├── UserLayout // 用户通用模版
│   │   ├── BlankLayout // 空白模版
│   │   └── TabLayout // 多页签模版
│   ├── models // 数据交互及逻辑
│   │   ├── globalModel.js // 全局基础数据处理
│   │   └── systems // 非业务需求数据处理
│   ├── services // 放请求借口方法的文件夹
│   │   └── systems // 非业务需求类请求
│   ├── setting // 配置类组件
│   ├── styles // 样式方法
│   │   ├── index.css // css默认样式支持
│   │   ├── utils.less // less样式公共方法
│   │   └── index.less // 公共less方法
│   ├── utils // 系统工具方法
│   │   ├── request.js // 公共请求封装工具类
│   │   ├── test.ts // typescript 模版组件
│   │   ├── utils.js // 工具类方法
│   │   └── utils.stateless.js // 无状态组件的工具类
│   ├── index.ejs // ejs模板引擎
│   ├── index.js // 入口文件
│   └── layout.js // 项目的layout跳转路由文件
├── .editorconfig // 编辑器统一配置
├── .eslintignore // 代码检查排除文件
├── .eslintrc // 代码检查文件
├── .gitignore // git上传时忽略的文件
├── .prettierrc // 配置自动保存后风格
├── .roadhogrc.mock.js // mock的配置文件
├── .webpackrc.js // 项目的配置文件
├── commitlint.config.js // 代码提交检查
├── jsconfig.json // 对js文件进行配置
├── package.lock.json // 项目的依赖锁
├── package.json // 当前整一个项目的依赖
├── tsconfig.json // 对typescript文件进行配置
└── webpack.config.js // 打包前的OPTION处理
```

## 开发环境 要求

    **安装 Nodejs**

    node > 8
    npm > 5

## 开发工具 建议

> 推荐 IDE - vscode

### VSCode 插件

- 插件

* Ant Design Snippets
* Auto Import
* Auto Rename Tag
* Beautify
* Bracket Pair Colorizer
* Code Spell Checker
* CSS Peek
* css-auto-prefix
* Debugger for Chrome
* Documnet This
* EditerConfig for VS Code
* ESLint
* GitLens
* JS JSX Snippets
* Markdown All in One
* markdownlint
* npm
* npm Intellisense
* open in browser
* Path Autocomplete
* Path Intellisense
* Prettier - Code formatter
* React Component
* React/Redux/react-router Snippets
* Sort lines
* vscode-fileheader
* vscode-icons

### VSCode 工作区设置 配置

[config](.vscode/settings.json)

## 项目主要依赖介绍

```json
  ...
  "dependencies": {
    "@antv/data-set": "0.8.9", //
    "@antv/g6": "^3.0.7-beta.1", // g6 图表库
    "@babel/polyfill": "7.2.5", //
    "antd": "3.23.4", //  UI库
    "bizcharts": "3.4.3", //  图表库
    "bizcharts-plugin-slider": "2.1.1",
    "braft-editor": "^2.3.8", // 编辑器
    "classnames": "2.2.6", //
    "dva": "2.4.1", // 数据流
    "dva-loading": "2.0.6", //
    "gg-editor": "^3.0.0-beta.1", //
    "history": "4.7.2", //
    "jsencrypt": "2.3.1", // rsa算法
    "lodash": "4.17.11", //  工具库
    "lodash-decorators": "4.5.0", //
    "moment": "2.24.0", //  时间库
    "nprogress": "^0.2.0", // 进度条
    "numeral": "2.0.6", //
    "omit.js": "1.0.0", //
    "path-to-regexp": "2.4.0", //
    "prop-types": "15.6.2", // 静态属性
    "rc-drawer-menu": "0.5.7", //
    "react": "16.2.0", //
    "react-amap": "^1.2.8", //
    "react-container-query": "0.9.1", //
    "react-contexify": "^4.1.1", //
    "react-copy-to-clipboard": "^5.0.1", //
    "react-dnd": "^9.4.0", // 拖拽
    "react-dnd-html5-backend": "^9.4.0", // 拖拽
    "react-document-title": "2.0.3", //
    "react-dom": "16.2.0", //
    "react-fittext": "1.0.0", //
    "react-highlight-words": "^0.16.0", //
    "react-json-view": "^1.19.1", // json 显示
    "react-markdown": "^4.2.2", // markdown 渲染
    "react-monaco-editor": "^0.31.0", // 编辑器
    "react-sparklines": "^1.7.0", //
    "react-split-pane": "^0.1.87", // 分屏
    "scaffold-core": "0.0.3-alpha.0.4", // 基础包
    "url-polyfill": "1.1.3" //
  },
  "devDependencies": {
    "@babel/plugin-transform-typescript": "^7.5.5", //
    "@babel/preset-typescript": "^7.3.3", //
    "@types/react": "^16.9.2", //
    "@types/react-dom": "^16.9.0", //
    "@typescript-eslint/eslint-plugin": "^1.10.2", //
    "@typescript-eslint/parser": "^1.10.2", //
    "babel-eslint": "10.0.1", //
    "babel-plugin-dva-hmr": "0.4.1", // 转译插件
    "babel-plugin-import": "1.11.0", //
    "babel-plugin-module-resolver": "3.1.3", //
    "babel-plugin-transform-decorators-legacy": "1.3.4", //
    "babel-preset-stage-2": "6.24.1", //
    "babel-runtime": "6.26.0", //
    "cross-env": "5.2.0", // 多环境
    "cross-port-killer": "1.0.1", //
    "eslint": "5.13.0", //  代码lint工具
    "eslint-config-airbnb": "^17.0.1", // lint配置
    "eslint-config-standard": "12.0.0", //
    "eslint-plugin-import": "2.16.0", //  lint插件
    "eslint-plugin-node": "8.0.1", //
    "eslint-plugin-prettier": "^3.1.1", //
    "eslint-plugin-promise": "4.0.1", //
    "eslint-plugin-react": "7.12.4", //
    "eslint-plugin-standard": "4.0.0", //
    "mocha": "5.2.0", // 测试代码库
    "mockjs": "1.0.1-beta3", // mock接口库
    "prettier": "1.18.2", // 风格库
    "regenerator-runtime": "0.11.1",
    "roadhog": "2.4.9", // 打包器
    "roadhog-api-doc": "0.3.4", // api文档
    "typescript": "^3.6.2" // ts
  },
  ...
```
