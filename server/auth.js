const axios = require('axios')
const config = require('../config')
const { client_id, client_secret, request_token_url } = config.github
module.exports = server => {
    return server.use(async (ctx, next) => {
        if (ctx.path === '/auth') {
            const code = ctx.query.code
            if (!code) {
                ctx.body = 'code not exist'
                return
            } else {
                const result = await axios({
                    method: 'POST',
                    url: request_token_url,
                    data: {
                        client_id,
                        client_secret,
                        code,
                    },
                    headers: {
                        Accept: 'application/json',
                    },
                })
                if (
                    result.status === 200 &&
                    result.data &&
                    !result.data.error
                ) {
                    ctx.session.githubAuth = result.data
                    const { access_token, token_type } = result.data
                    const userInfoResp = await axios({
                        method: 'GET',
                        url: 'https://api.github.com/user',
                        headears: {
                            Authorization: `${token_type} ${access_token}`,
                        },
                    })
                    console.log(userInfoResp)
                    ctx.session.userInfo = userInfoResp.data
                    ctx.redirect('/')
                } else {
                    const errorMsg = result.data && result.data.error
                    ctx.body = `request token failed ${errorMsg}`
                }
            }
        } else {
            await next()
        }
    })
}
