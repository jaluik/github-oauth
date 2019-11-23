import Comp from '../components/comp'
import { withRouter } from 'next/router'

const A = ({ router, name, a }) => (
    <>
        <Comp>
            A {name} {a}
        </Comp>
        <a>helolo</a>
        <a className="link">fesfse</a>
        <style jsx>
            {`
                a {
                    color: blue;
                }
                .link {
                    font-size: 25px;
                }
            `}
        </style>
    </>
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
