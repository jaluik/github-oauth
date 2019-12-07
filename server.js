const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const koaBody = require('koa-body')
const session = require('koa-session')
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')
const atob = require('atob')

const auth = require('./server/auth')
const api = require('./server/api')

const dev = process.env.NODE_PAHT !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const redis = new Redis()

global.atob = atob

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    server.keys = ['jaluik is using github oauth']
    server.use(koaBody())
    const SESSION_CONFIG = {
        key: 'jid',
        store: new RedisSessionStore(redis),
    }

    server.use(session(SESSION_CONFIG, server))
    // 配置处理github-oauth登录
    auth(server)
    api(server)

    server.use(async (ctx, next) => {
        //     // console.log(ctx.cookies.get('id'))

        //     if (!ctx.session.user) {
        //         ctx.session.user = {
        //             name: 'jaluik',
        //             age: 18,
        //         }
        //     } else {
        console.log('ctx session is: ', ctx.session)
        //     }
        await next()
    })

    router.get('/a/:id', async ctx => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: { id },
        })
        ctx.respond = false
    })
    router.get('/api/user/info', async ctx => {
        const user = ctx.session.userInfo
        if (!user) {
            ctx.status = 401
            ctx.body = 'Need Login'
        } else {
            ctx.body = user
            ctx.set('Content-type', 'application/json')
        }
    })

    server.use(router.routes())

    server.use(async (ctx, next) => {
        // ctx.cookies.set('id', 'useId:xxxx')
        ctx.req.session = ctx.session
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(3000, () => {
        console.log('server is listening on port 3000')
    })
})
