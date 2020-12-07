# vue + webpack + vuex

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at https://localhost:443
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 单页面架构
```text
--src
    |--pages
        |--组件文件夹
        |--App.vue
        |--index.html
        |--main.js
    |--router
    |--store
```
## 多页面架构
```text
--src
    |--pages
        |--home页面
            |--router
            |--store
            |--组件文件夹
            |--App.vue
            |--index.html
            |--main.js
        |--detail页面
            |--router
            |--store
            |--组件文件夹
            |--App.vue
            |--index.html
            |--main.js
```
可根据需要删掉无用代码，进行自己项目的架构
