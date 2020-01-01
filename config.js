const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'
const client_id = 'b07e22c1bfe80ac6d2cf'
const SCOPE = 'user'

module.exports = {
    github: {
        request_token_url: 'https://github.com/login/oauth/access_token',
        client_id,
        client_secret: '',
    },
    GITHUB_OAUTH_URL,
    OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
    // token eddd07ff2c851b8010fad60a3087a5fbbd843105&scope=user&token_type=bearer
}
