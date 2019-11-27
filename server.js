const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const RedisSessionStore = require('./server/session-store')
const Redis = require('ioredis')

const dev = process.env.NODE_PAHT !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const redis = new Redis()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    server.keys = ['jaluik is using github oauth']
    const SESSION_CONFIG = {
        key: 'jid',
        store: new RedisSessionStore(redis),
    }

    server.use(session(SESSION_CONFIG, server))
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

    router.get('/set/user', async ctx => {
        ctx.session.user = {
            name: 'jaluik',
            age: 18,
        }
        ctx.body = 'set session success'
    })

    router.get('/del/user', async ctx => {
        ctx.session = null
        ctx.body = 'del session success'
    })
    server.use(router.routes())

    server.use(async (ctx, next) => {
        // ctx.cookies.set('id', 'useId:xxxx')
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(3000, () => {
        console.log('server is listening on port 3000')
    })
})
