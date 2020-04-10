``` bash
├── build                                        // 构建相关  
├── config                                       // 配置相关
├── src                                          // 项目代码
│   ├── assets                                   // 样式、图标等静态资源
│   ├── components                               // 全局公用组件
│   │   ├── banner.vue                           // banner组件
│   │   ├── commentItem.vue                      // 评论Item组件
│   │   ├── error.vue                            // 错误提示组件
│   │   ├── info.vue                             // listItem的列表信息组件
│   │   ├── listItem.vue                         // 文章List组件
│   │   ├── loading.vue                          // 加载提示组件
│   │   ├── myHeader.vue                         // 头部组件
│   │   ├── popuMenu.vue                         // 模态框组件
│   │   ├── publishItem.vue                      // 后台文章列表组件
│   │   ├── tool.vue                             // 评论工具栏组件
│   ├── config                                   // 全局公用方法
│   │   ├── autoTextarea.js                      // textarea自动增加高度方法
│   │   ├── cache.js                             // 缓存方法
│   │   ├── cordova.js                           // cordova插件方法
│   │   ├── directive.js                         // 指令方法
│   │   ├── fetch.js                             // 请求方法
│   ├── page
│   │   ├── detail
│   │   |   ├── children
│   │   |   |   ├── comment.vue                  // 评论页
│   │   |   |   ├── reply.vue                    // 回复页
│   │   |   ├── components
│   │   |   |   ├── article.vue                  // 文章组件
│   │   |   |   ├── collect.vue                  // 收藏组件
│   │   |   |   ├── like.vue                     // 点赞组件
│   │   |   |   ├── recommend.vue                // 推荐组件
│   │   |   |   ├── share.vue                    // 分享组件
│   │   |   |   ├── tags.vue                     // 标签组件
│   │   |   ├── detail.vue                       // 详情页
│   │   ├── index
│   │   |   ├── collect
│   │   |   |   ├── collect.vue                  // 收藏页
│   │   |   ├── home
│   │   |   |   ├── children
│   │   |   |   |   ├── channel.vue              // 栏目页
│   │   |   |   ├── components
│   │   |   |   |   ├── homeHeader.vue           // 首页头部组件
│   │   |   |   |   ├── pullContainer.vue        // 下拉容器组件
│   │   |   |   |   ├── swiperContainer.vue      // 滑动容器组件
│   │   |   |   ├── home.vue                     // 主页
│   │   |   ├── user
│   │   |   |   ├── children
│   │   |   |   |   ├── health
│   │   |   |   |   |   ├── health.vue           // 文章管理页
│   │   |   |   |   |   ├── preview.vue          // 文章预览页
│   │   |   |   |   |   ├── publish.vue          // 文章编辑页
│   │   |   |   |   ├── feedBack.vue             // 用户反馈页
│   │   |   |   |   ├── myComment.vue            // 我的评论页
│   │   |   |   |   ├── myHistory.vue            // 我的历史页
│   │   |   |   |   ├── QRcode.vue               // 应用分享页
│   │   |   |   ├── user.vue                     // 用户页
│   │   |   ├── video
│   │   |   |   ├── video.vue                    // 视频页
│   │   |   ├── index.vue                        // 首页
│   │   |   ├── navBar.vue                       // 底部导航组件
│   │   ├── login
│   │   |   ├── login.vue                        // 登录页
│   │   ├── search
│   │   |   ├── search.vue                       // 搜索页
│   ├── router
│   │   ├── index.js                             // 路由配置
│   ├── store
│   │   ├── collect                              // 收藏页store
│   │   ├── detail                               // 详情页store
│   │   ├── health                               // 文章管理store
│   │   ├── index                                // 首页store
│   │   ├── login                                // 登录store
│   │   ├── search                               // 搜索页store
│   │   ├── user                                 // 用户store
│   │   ├── video                                // 视频页store
│   │   ├── index.js                             // 全局store
│   ├── App.vue                                  // 页面入口
│   └── main.js                                  // 程序入口
├── static                                       // 空文件夹，只作为github保留
├── .babelrc                                     // babel-loader 配置
├── .eslintrc.js                                 // eslint 配置项
├── .gitignore                                   // git 忽略项
├── index.html                                   // 入口html文件
└── package.json                                 // package.json
```

## 安装运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8084 or localhost:8086
npm run dev

# build for production with minification
npm run build
