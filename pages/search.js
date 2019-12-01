import { withRouter } from 'next/router'

const Search = ({ router }) => {
    return <div>{router.query.query || '111'}</div>
}

export default withRouter(Search)
