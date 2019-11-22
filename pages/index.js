import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

const events = [
    'routeChangeStart',
    'routeChangeComplete',
    'routeChangeError',
    'beforeHistoryChange',
    'hashChangeStart',
    'hashChangeComplete',
]

function makeEvent(type) {
    return (...args) => {
        console.log(type, ...args)
    }
}
events.forEach(e => {
    Router.events.on(e, makeEvent(e))
})

export default () => {
    return <>index</>
}
