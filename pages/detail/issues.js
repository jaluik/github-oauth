import { useState, useCallback } from 'react'
import withRepoBasic from '../../components/WithRepoBasic'
import api from '../../lib/api'
import { Avatar, Button } from 'antd'
import dynamic from 'next/dynamic'
import { getLastUpdates } from '../../lib/utils'
import SearchUser from '../../components/SearchUser'

const MDRenderer = dynamic(() => import('../../components/MarkdownRenderer'))

function IssueDetail({ issue }) {
    return (
        <div className="root">
            <MDRenderer content={issue.body} />
            <div className="actions">
                <Button href={issue.html_url} target="_black">
                    打开Issue讨论界面
                </Button>
            </div>
            <style jsx>
                {`
                    .root {
                        background: #fafafa;
                        padding: 20px;
                    }
                    .actions {
                        text-align: right;
                    }
                `}
            </style>
        </div>
    )
}

function IssueItem({ issue }) {
    const [showDetal, setShowDetail] = useState(false)
    const toggleShowDetail = useCallback(() => {
        setShowDetail(detail => !detail)
    }, [])
    return (
        <div>
            <div className="issue">
                <Button
                    type="primary"
                    size="small"
                    style={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={toggleShowDetail}
                >
                    {showDetal ? '隐藏' : '查看'}
                </Button>
                <div className="avatar">
                    <Avatar
                        src={issue.user.avatar_url}
                        shape="square"
                        size={50}
                    />
                </div>
                <div className="main-info">
                    <h6>
                        <span>{issue.title}</span>
                    </h6>
                    <p className="sub-info">
                        <span>
                            Updated at {getLastUpdates(issue.updated_at)}
                        </span>
                    </p>
                </div>

                <style jsx>{`
                    .issue {
                        display: flex;
                        position: relative;
                        padding: 10px;
                    }
                    .issue:hover {
                        background: #fafafa;
                    }
                    .issue + .issue {
                        border-top: 1px solid #eee;
                    }
                    .main-info > h6 {
                        max-width: 600px;
                        font-size: 16px;
                        padding-right: 40px;
                    }
                    .avatar {
                        margin-right: 20px;
                    }
                    .sub-info {
                        margin-bottom: 0;
                    }
                    .subinfo > span + span {
                        display: inline-block;
                        margin-left: 20px;
                        font-size: 12px;
                    }
                `}</style>
            </div>
            {showDetal ? <IssueDetail issue={issue} /> : null}
        </div>
    )
}

const Issues = ({ issues }) => {
    const [creator, setCreator] = useState()
    const handleCreatorChange = useCallback(value => {
        setCreator(value)
    }, [])
    return (
        <div className="root">
            <SearchUser onChange={handleCreatorChange} value={creator} />
            <div className="issues">
                {issues.map(issue => (
                    <IssueItem issue={issue} key={issue.id} />
                ))}
            </div>
            <style jsx>
                {`
                    .issues {
                        border: 1px solid #eee;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        margin-top: 20px;
                    }
                `}
            </style>
        </div>
    )
}

Issues.getInitialProps = async ({ ctx }) => {
    const { owner, name } = ctx.query

    const issuesResp = await api.request(
        {
            url: `/repos/${owner}/${name}/issues`,
        },
        ctx.req,
        ctx.res
    )

    return {
        issues: issuesResp.data,
    }
}

export default withRepoBasic(Issues, 'issues')
