import { useState, useCallback, useEffect } from 'react'
import withRepoBasic from '../../components/WithRepoBasic'
import api from '../../lib/api'
import { Avatar, Button, Select, Spin } from 'antd'
import dynamic from 'next/dynamic'
import { getLastUpdates } from '../../lib/utils'
import SearchUser from '../../components/SearchUser'

const MDRenderer = dynamic(() => import('../../components/MarkdownRenderer'))
const CACHE = {}

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
                        {issue.labels.map(label => (
                            <Label label={label} key={label.id}></Label>
                        ))}
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

function makeQuery(creator, state, labels) {
    let creatorStr = creator ? `creator=${creator}` : ''
    let stateStr = state ? `state=${state}` : ''
    let labelsStr = ''
    if (labels && labels.length > 0) {
        labelsStr = `labels=${labels.join(',')}`
    }
    const arr = []
    if (creatorStr) {
        arr.push(creatorStr)
    }
    if (stateStr) {
        arr.push(stateStr)
    }
    if (labelsStr) {
        arr.push(labelsStr)
    }
    return `?${arr.join('&')}`
}

function Label({ label }) {
    return (
        <>
            <span
                className="label"
                style={{ backgroundColor: `#${label.color}` }}
            >
                {label.name}
            </span>
            <style jsx>{`
                .label {
                    display: inline-block;
                    line-height: 20px;
                    margin-left: 15px;
                    padding: 3px 10px;
                    border-radius: 3px;
                    font-size: 14px;
                }
            `}</style>
        </>
    )
}

const Option = Select.Option
const isSever = typeof window === 'undefined'
const Issues = ({ initialIssues, labels, owner, name }) => {
    const [creator, setCreator] = useState()
    const [state, setState] = useState()
    const [label, setLabel] = useState([])
    const [issues, setIssues] = useState(initialIssues)
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        if (!isSever) {
            CACHE[`${owner}/${name}`] = labels
        }
    }, [labels, owner, name])

    const handleCreatorChange = useCallback(value => {
        setCreator(value)
    }, [])
    const handleStateChange = useCallback(value => {
        setState(value)
    }, [])
    const handleLableChange = useCallback(value => {
        setLabel(value)
    }, [])
    const handleSearch = () => {
        setFetching(true)
        api.request({
            url: `/repos/${owner}/${name}/issues${makeQuery(
                creator,
                state,
                label
            )}`,
        })
            .then(resp => {
                setFetching(false)
                setIssues(resp.data)
            })
            .catch(e => {
                console.error(e)
                setFetching(false)
            })
    }

    return (
        <div className="root">
            <div className="search">
                <SearchUser onChange={handleCreatorChange} value={creator} />
                <Select
                    placeholder="状态"
                    onChange={handleStateChange}
                    value={state}
                    style={{ width: 200, marginLeft: 20 }}
                >
                    <Option value="all">all</Option>
                    <Option value="open">open</Option>
                    <Option value="closed">closed</Option>
                </Select>
                <Select
                    mode="multiple"
                    placeholder="Label"
                    onChange={handleLableChange}
                    value={label}
                    style={{ marginLeft: 20, marginRight: 20, flexGrow: 1 }}
                >
                    {labels.map(label => (
                        <Option value={label.name} key={label.id}>
                            {label.name}
                        </Option>
                    ))}
                </Select>
                <Button
                    type="primary"
                    onClick={handleSearch}
                    disabled={fetching}
                >
                    搜索
                </Button>
            </div>
            {fetching ? (
                <div className="loading">
                    <Spin />
                </div>
            ) : (
                <div className="issues">
                    {issues.map(issue => (
                        <IssueItem issue={issue} key={issue.id} />
                    ))}
                </div>
            )}
            <style jsx>
                {`
                    .issues {
                        border: 1px solid #eee;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        margin-top: 20px;
                    }
                    .search {
                        display: flex;
                    }
                    .loading {
                        height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </div>
    )
}

Issues.getInitialProps = async ({ ctx }) => {
    const { owner, name } = ctx.query

    const full_name = `${owner}/${name}`
    const fetches = await Promise.all([
        await api.request(
            {
                url: `/repos/${owner}/${name}/issues`,
            },
            ctx.req,
            ctx.res
        ),
        CACHE[full_name]
            ? Promise.resolve({ data: CACHE[full_name] })
            : await api.request(
                  {
                      url: `/repos/${owner}/${name}/labels`,
                  },
                  ctx.req,
                  ctx.res
              ),
    ])

    return {
        owner,
        name,
        initialIssues: fetches[0].data,
        labels: fetches[1].data,
    }
}

export default withRepoBasic(Issues, 'issues')
