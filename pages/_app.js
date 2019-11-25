import App from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'

import store from '../store/store'

import 'antd/dist/antd.css'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
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
        const { Component, pageProps, a } = this.props
        return (
            <>
                <Provider store={store}>
                    <Layout>
                        <h1>{this.props.title}</h1>
                        <Component {...pageProps} a={a} />
                    </Layout>
                </Provider>
            </>
        )
    }
}
export default MyApp
