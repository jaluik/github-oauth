import { useState, useCallback } from 'react'
import withRepoBasic from '../../components/WithRepoBasic'
import api from '../../lib/api'
import { Avatar, Button } from 'antd'

function IssueItem({ issue }) {
    const [showDetal, setShowDetail] = useState(false)
    const toggleShowDetail = useCallback(() => {
        setShowDetail(detail => !detail)
    }, [])
    return (
        <div className="issue">
            <Button
                type="primary"
                size="small"
                style={{ position: 'absolute', right: 10, top: 10 }}
                onClick={toggleShowDetail}
            >
                {showDetal ? '查看' : '隐藏'}
            </Button>
            <div className="avatar">
                <Avatar src={issue.user.avatar_url} shape="square" size={50} />
            </div>
            <div className="main-info">
                <h6>
                    <span>{issue.title}</span>
                </h6>
                <p className="sub-info">
                    <span>Updated at {issue.updated_at}</span>
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
    )
}

const Issues = ({ issues }) => {
    console.log(issues)
    return (
        <div className="root">
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
