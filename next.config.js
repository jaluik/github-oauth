const WithCss = require('@zeit/next-css')
const myConfig = require('./config')

const config = {
    //输出文件的路由生成Etag
    distDir: 'dest',
    //是否给每个路由生成Etags
    generateEtags: true,
    //页面内容缓存配置
    onDemandEntries: {
        //内容再内存中缓存的市场(ms)
        maxInactiveAge: 25 * 1000,
        //同时缓存多少个界面
        pagesBufferLength: 2,
    },
    //在pages目录下那种后缀的文件会被认为是页面
    pageExtensions: ['jsx', 'js'],
    //配置buildId
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
            return process.env.YOUR_BUILD_ID
        }
        return null
    },
    //手动修改webpack config
    webpack(config, options) {
        return config
    },
    //修改webpackDevMiddleware配置
    webpackDevMiddleware: config => {
        return config
    },
    env: {
        customKey: 'value',
    },
    // 下面两个要通过'next/config'来读取
    // 只有在服务器渲染时才会获取的配置信息
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    //在服务器端渲染和客户端渲染都可获取的配置
    publicRuntimeConfig: {
        staticFolder: '/static',
    },
}

if (typeof require !== undefined) {
    require.extensions['.css'] = file => {}
}
module.exports = WithCss({
    publicRuntimeConfig: {
        GITHUB_OAUTH_URL: myConfig.GITHUB_OAUTH_URL,
        OAUTH_URL: myConfig.OAUTH_URL,
    },
})
