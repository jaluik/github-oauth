import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { add } from '../store/store'
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

const Index = ({ count, name, add, rename }) => {
    return (
        <>
            <a>{count}</a>
            <a>{name}</a>
            <input value={name} onChange={e => rename(e.target.value)} />
            <button onClick={() => add(1)}>Add</button>
        </>
    )
}

Index.getInitialProps = async ({ reduxStore }) => {
    reduxStore.dispatch(add(454))
    return {}
}

export default connect(
    function mapStateToProps(state) {
        return {
            count: state.count.count,
            name: state.user.name,
        }
    },
    function mapDispatchToProps(dispatch) {
        return {
            add: num => dispatch({ type: 'ADD', num }),
            rename: name => dispatch({ type: 'USER_UPDATE', name }),
        }
    }
)(Index)
