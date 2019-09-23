# React Single Page Application Scaffold support multiTabPage

> Author: Objectivezt
> version: 1.0.0
> description: 基于 React 和 Ant Design 的单页应用多页签脚手架

## 目录结构介绍

├── .vscode  IDE 代码基础配置
├── build   // 打包OPTION信息
├── dist   // 打包输入文件
├── mock    // mock数据文件夹
├── node_modules // 第三方的依赖
├── src  // 最重要的文件夹，编写代码都在这个文件夹下
│   ├── assets // 可以放图片等公共资源
│   ├── common // 公共组件数据
│       ├── globalUI // 对antd的公共封装
│       ├── i18N // 国际化文件配置
│       ├── baseRouterUrl.js // 国际化文件配置
│       ├── config.js // 基础配置
│       ├── localButton.js // 本地按钮
│       ├── localMenu.js  //本地菜单
│       ├── router.js  // 基础路由表
│       └── theme.js // 主题文件
│   ├── components // 就是react中基础组件
│   ├── containers // 页面组件
│   ├── layouts // layout模版
│       ├── AuthLayout // 后台管理通用模版
│       ├── PageHeaderLayout // 页面头模版
│       ├── TouristLayout // 前台游客页通用模版
│       ├── UserLayout // 用户通用模版
│       ├── BlankLayout // 空白模版
│       └── TabLayout // 多页签模版
│   ├── models // 数据交互及逻辑
│   ├── services // 放请求借口方法的文件夹
│   ├── styles // 样式方法
│   ├── utils // 系统工具方法
│       ├── request.js // 公共请求封装工具类
│       ├── test.ts // typescript 模版组件
│       ├── utils.js // 工具类方法
│       └── utils.stateless.js // 无状态组件的工具类
│   ├── index.ejs // ejs模板引擎
│   ├── index.js // 入口文件
│   └── layout.js // 项目的layout跳转路由文件
├── .eslintignore // 代码检查排除文件
├── .eslintrc // 代码检查文件
├── .editorconfig // 编辑器统一配置
├── .gitignore // git上传时忽略的文件
├── .webpackrc.js // 项目的配置文件
├── .roadhogrc.mock.js // mock的配置文件
├── .prettierrc // 配置自动保存后风格
├── jsconfig.json // 对js文件进行配置
├── tsconfig.json // 对typescript文件进行配置
├── webpack.config.js // 打包前的OPTION处理
├── package.lock.json // 项目的依赖锁
└── package.json // 当前整一个项目的依赖

## 开发环境 要求

    **安装 Nodejs**

    node > 8
    npm > 5

## 开发工具 建议

> 推荐 IDE - vscode

### VSCode 插件建立

-   插件

*   Ant Design Snippets
*   Auto Import
*   Auto Rename Tag
*   Beautify
*   Bracket Pair Colorizer
*   Code Spell Checker
*   CSS Peek
*   css-auto-prefix
*   Debugger for Chrome
*   Documnet This
*   EditerConfig for VS Code
*   ESLint
*   GitLens
*   JS JSX Snippets
*   Markdown All in One
*   markdownlint
*   npm
*   npm Intellisense
*   open in browser
*   Path Autocomplete
*   Path Intellisense
*   Prettier - Code formatter
*   React Component
*   React/Redux/react-router Snippets
*   Sort lines
*   vscode-fileheader
*   vscode-icons

### VSCode 工作区设置 配置

#### git 版本

```json

"editor.formatOnPaste": true,
"editor.formatOnSave": true,
"editor.formatOnType": true,
"editor.snippetSuggestions": "top",
"eslint.enable": true,
"files.encoding": "utf8",
"javascript.format.enable": true,
"gitlens.advanced.messages": {
	"suppressShowKeyBindingsNotice": true
},
"git.autofetch": true,
"git.ignoreMissingGitWarning": true,
"prettier.singleQuote": true,
"terminal.integrated.rendererType": "dom",
"workbench.iconTheme": "vscode-icons",
"eslint.packageManager": "npm",

```
