import withRepoBasic from '../../components/WithRepoBasic'
import api from '../../lib/api'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const Detail = ({ readme }) => {
    const content = atob(readme.content)
    const html = md.render(content)
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

Detail.getInitialProps = async ({
    ctx: {
        query: { owner, name },
        req,
        res,
    },
}) => {
    const readmeResp = await api.request(
        {
            url: `/repos/${owner}/${name}/readme`,
        },
        req,
        res
    )

    return {
        readme: readmeResp.data,
    }
}

export default withRepoBasic(Detail, 'index')
