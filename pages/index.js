const api = require('../lib/api')
import { useEffect } from 'react'
import axios from 'axios'
const Index = () => {
    useEffect(() => {
        axios.post('/github/test', { test: 123 })
    })

    return <span>index</span>
}

Index.getInitialProps = async ({ ctx }) => {
    // const result = await axios({
    //     url: '/github/search/repositories?q=react',
    //     method: 'GET',
    // })

    const result = await api.request(
        { url: '/search/repositories?q=react' },
        ctx.req,
        ctx.res
    )

    return {
        data: result.data,
    }
}

export default Index
