const WithCss = require('@zeit/next-css')
if (typeof require !== undefined) {
    require.extensions['.css'] = file => {}
}

module.exports = WithCss({})
