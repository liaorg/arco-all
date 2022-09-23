## 目录结构

```
├── README.md
├── package.json
├── index.html
├── src
│   ├── api  # 请求接口
│   ├── assets  # 静态资源
│          └── style 全局样式
│   ├── components  # 通用业务组件
│   ├── config  # 全局配置(包含echarts主题)
│          └── settings.json  # 配置文件
│   ├── directives # 指令集（如需，可自行补充）
│   ├── filters # 过滤器（如需，可自行补充）
│   ├── hooks # 全局hooks
│   ├── layout  # 布局
│   ├── locale  # 国际化语言包
│   ├── mock  # 模拟数据
│   ├── views  # 页面模板
│   ├── router # 路由配置
│   ├── store  # 状态管理中心
│   ├── types  # Typescript 类型
│   └── utils  # 工具库
│   └── App.vue  # 视图入口
│   └── main.ts  # 入口文件
└── tsconfig.json

```

## Installation

```bash
vscode 扩展
Chinese:中文语言包
ESLint
Prettier:格式化代码-JavaScript / TypeScript / CSS
JavaScript (ES6) snippets:支持 JavaScript ES6 语法
Bookmarks
stylelint

JavaScript (ES6) code snippets in StandardJS style:Javascript (ES6)代码片段
Auto Close Tag:自动闭合 HTML 标签
Auto Rename Tag:自动重命名 HTML 标签
One Dark Pro
Babel JavaScript：支持ES201X、React、FlowType以及GraphQL的语法高亮。
Remote - WSL

Path Intellisense 路径补全

Vue Language Features (Volar)
TypeScript Vue Plugin (Volar)
Vue VSCode Snippets

es6-string-html

在 ts 中使用 vue
[https://cn.vuejs.org/guide/typescript/overview.html#volar-takeover-mode]

$ npm install
$ npm install --force
$ npm install --legacy-peer-deps
```

## Vue 的安全措施

````
1. 插件安全
可以用 npm/yarn audit 这个命令审计下依赖包的代码是否安全
或者直接 npm audit fix 升级下包
2. Vue 的安全措施
    1. 使用模板语法 {{}}
    2. Attribute 绑定 v-bind/:
    3. 注入 HTML v-html
    4. 注入 url v-bind:href/:href
    5. 注入样式 :style => 只允许修改特定的 property 的值
    ```
        <a
          v-bind:href="sanitizedUrl"
          v-bind:style="{
            color: userProvidedColor,
            background: userProvidedBackground
          }"
        >
          click me
        </a>
    ```
    6. 注入 JavaScript

````

## 升级

```
yarn set version stable
yarn set version 1.22.19
yarn audit
yarn outdated
yarn add
yarn add -D

yarn outdated   # 检测哪些包可以升级
yarn upgrade @arco-design/web-vue arco-design-pro-vue --latest  # 升级最新版本
yarn upgrade arco-design-pro-vue@2.5.11  # 升级指定包

npm audit
npm outdated
npm install -D
npm update
```

## 配置 git

```
git config --global user.name "username"
git config --global user.email useremail@163.com
```

### 提交规范

git commit -m "type: subject"

1、type (必须)
用于说明 git commit 的类别，只允许使用下面的标识
feat: 新功能（feature）
fix: 修复 bug
docs: 文档（documentation）
style: 格式（不影响代码运行的变动）
refactor: 重构（既不是新增功能，也不是修改 bug 的代码变动）
test: 增加测试
chore: 构建过程或辅助工具的变动
revert: 回滚到上一个版本
merge: 代码合并

## 配置 lanunch.json 进行应用调试

```

```

## Running the app

## Test

## License

## i18n
