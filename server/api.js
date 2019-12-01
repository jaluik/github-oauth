const github_base_url = 'https://api.github.com'
const axios = require('axios')

module.exports = server => {
    server.use(async (ctx, next) => {
        const path = ctx.path
        if (path.startsWith('/github/')) {
            const githubAuth = ctx.session.githubAuth
            const githubPath = `${github_base_url}${ctx.url.replace(
                '/github/',
                '/'
            )}`
            let headers = {}
            const token = githubAuth && githubAuth.access_token

            if (token) {
                const { access_token, token_type } = githubAuth
                headers['Authorization'] = `${token_type} ${access_token}`
            }
            try {
                const result = await axios({
                    method: 'GET',
                    url: githubPath,
                    headers,
                })
                if (result.status === 200) {
                    ctx.body = result.data
                    ctx.set('Content-type', 'application/json')
                } else {
                    ctx.status = result.status
                    ctx.body = {
                        success: false,
                    }
                    ctx.set('Content-type', 'application/json')
                }
            } catch (err) {
                console.log(err)
                ctx.body = {
                    success: false,
                }
                ctx.set('Content-type', 'application/json')
            }
        } else {
            await next()
        }
    })
}
