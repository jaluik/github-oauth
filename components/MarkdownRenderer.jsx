import { memo, useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import 'github-markdown-css'

const md = new MarkdownIt({
    html: true,
    linkify: true,
})

function b64_to_uft(str) {
    return decodeURIComponent(escape(atob(str)))
}

export default memo(({ content, isBase64 }) => {
    const markdown = isBase64 ? b64_to_uft(content) : content

    const html = useMemo(() => md.render(markdown), [markdown])
    return (
        <div className="markdown-body">
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
    )
})
