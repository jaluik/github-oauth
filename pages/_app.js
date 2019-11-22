import App from 'next/app'
import Layout from '../components/Layout'

import 'antd/dist/antd.css'

class MyApp extends App {
    static async getInitialProps({ Component }) {
        let pageProps
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps()
        }
        return {
            pageProps,
            a: 1,
        }
    }

    render() {
        const { Component, pageProps, a } = this.props
        return (
            <Layout>
                <Component {...pageProps} a={a} />
            </Layout>
        )
    }
}
export default MyApp
