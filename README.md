# sell
Vue.js2.0高仿饿了么外卖App，个人学习备注。

## 介绍
* 学习imooc的Vue教程，原教程用Vue1.x制作。学习的时候参考Vue2.x文档，修改了很少的部分源码     
* 状态管理本来加入了Vuex，后来发现这个项目太小，好像没有必要用Vuex，最终去掉（注释），还是使用简单的组件间通信做的  
* 没有制作小球掉落动画 

## 修改内容
* 修改`ref`的DOM选择器的写法  
* 修改`transition`动画的写法  
* 替换`vue-rescose`为`axios`，因为官方推荐  
* 增加首页Loading动画  
* 修改`keep-alive`写法
* 修改部分`inline-block`为`inline-flex`
* 修改`<style scoped>`，禁止组件样式影响全局样式

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 依赖
```json
"dependencies": {
    "vue": "^2.1.0",
    "vue-router":"^2.0.0",
    "vuex":"^2.1.0",
    "axios":"^0.15.2",
    "lodash":"^4.17.4",
    "better-scroll":"^0.1.11"
  },
```

 
