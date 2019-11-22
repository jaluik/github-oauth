import Comp from '../components/comp'
import { withRouter } from 'next/router'

const A = ({ router, name, a }) => (
    <Comp>
        A {name} {a}
    </Comp>
)

A.getInitialProps = async () => {
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            res({
                name: 'jaluik',
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(A)
