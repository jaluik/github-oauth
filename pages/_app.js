import App from 'next/app'
import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'
import { Provider } from 'react-redux'
import testHoc from '../lib/with-redux'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import 'antd/dist/antd.css'

class MyApp extends App {
    state = {
        loading: false,
    }

    startLoading = () => {
        this.setState({
            loading: true,
        })
    }
    stopLoading = () => {
        this.setState({
            loading: false,
        })
    }

    componentDidMount() {
        Router.events.on('routeChangeStart', this.startLoading)
        Router.events.on('routeChangeComplete', this.stopLoading)
        Router.events.on('routeChangeError', this.stopLoading)
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', this.startLoading)
        Router.events.off('routeChangeComplete', this.stopLoading)
        Router.events.off('routeChangeError', this.stopLoading)
    }
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
        const { Component, pageProps, reduxStore } = this.props
        return (
            <>
                <Provider store={reduxStore}>
                    {this.state.loading && <PageLoading />}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </>
        )
    }
}
export default testHoc(MyApp)
