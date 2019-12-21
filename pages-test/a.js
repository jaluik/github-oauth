import { withRouter } from 'next/router'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const Comp = dynamic(import('../components/comp'))

const Title = styled.h1`
    color: yellow;
    font-size: 25px;
`
const A = ({ router, name, a, time }) => (
    <>
        <Title>styled-title {time}</Title>
        <Comp>
            A {name} {a}
        </Comp>
        <a>helolo</a>
        <a className="link">fesfse</a>
        <style jsx>
            {`
                a {
                    color: red;
                }
                .link {
                    font-size: 25px;
                }
            `}
        </style>
    </>
)

A.getInitialProps = async () => {
    const moment = await import('moment')
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            res({
                name: 'jaluik',
                time: moment.default(Date.now() - 60 * 1000).fromNow(),
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(A)
