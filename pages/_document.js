import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

function withLog(Com) {
    return props => {
        console.log(props)
        ;<Com {...props}></Com>
    }
}
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originRender = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originRender({
                    enhenceApp: App => props =>
                        sheet.collectStyles(<App {...props}></App>),
                })
            const props = await Document.getInitialProps(ctx)
            return {
                ...props,
                styles: (
                    <>
                        {props.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head></Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument
