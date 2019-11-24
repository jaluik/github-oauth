const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const dev = process.env.NODE_PAHT !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/a/:id', async ctx => {
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a/',
            query: {
                id,
            },
        })
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
        await next()
    })
    server.use(router.routes())

    server.listen(3000, () => {
        console.log('server is listening on port 3000')
    })
})
