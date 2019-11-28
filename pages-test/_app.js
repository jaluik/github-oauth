import App from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import testHoc from '../lib/with-redux'

import 'antd/dist/antd.css'

class MyApp extends App {
    static async getInitialProps(ctx) {
        const { Component } = ctx

        let pageProps
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return {
            pageProps,
            a: 1,
        }
    }

    render() {
        const { Component, pageProps, a, reduxStore } = this.props
        return (
            <>
                <Provider store={reduxStore}>
                    <Layout>
                        <h1>{this.props.title}</h1>
                        <Component {...pageProps} a={a} />
                    </Layout>
                </Provider>
            </>
        )
    }
}
export default testHoc(MyApp)
