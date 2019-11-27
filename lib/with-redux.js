import React from 'react'
import createStore from '../store/store'
const isServer = typeof window === 'undefined'
const __NEXT_REDUX_SOTRE__ = '__NEXT_REDUX_SOTRE__'
const getOrCreateStore = initialState => {
    if (isServer) {
        return createStore(initialState)
    }
    if (!window[__NEXT_REDUX_SOTRE__]) {
        window[__NEXT_REDUX_SOTRE__] = createStore(initialState)
    }
    return window[__NEXT_REDUX_SOTRE__]
}

export default Comp => {
    class WithRedux extends React.Component {
        constructor(props) {
            super(props)
            this.reduxStore = getOrCreateStore(props.initialReduxState)
        }

        render() {
            const { Component, pageProps, ...rest } = this.props
            if (pageProps) {
                pageProps.test = '123'
            }
            return (
                <Comp
                    Component={Component}
                    pageProps={pageProps}
                    {...rest}
                    reduxStore={this.reduxStore}
                ></Comp>
            )
        }
    }

    WithRedux.getInitialProps = async ctx => {
        const reduxStore = getOrCreateStore()
        ctx.reduxStore = reduxStore
        let appProps = {}
        if (
            Comp.getInitialProps &&
            typeof Comp.getInitialProps === 'function'
        ) {
            appProps = await Comp.getInitialProps(ctx)
        }
        return {
            ...appProps,
            initialReduxState: reduxStore.getState(),
        }
    }
    return WithRedux
}
