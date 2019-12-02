import Link from 'next/link'
import { Icon } from 'antd'
import moment from 'moment'

function getLicense(license) {
    return license ? `${license.spdx_id} license` : ''
}

function getLastUpdates(time) {
    return moment(time).fromNow()
}

export default ({ repo }) => {
    return (
        <div className="root">
            <div className="basic-info">
                <h3 className="repo-title">
                    <Link
                        href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}
                    >
                        <a>{repo.full_name}</a>
                    </Link>
                </h3>
                <p className="repo-desc">{repo.description}</p>
                <p className="other-info">
                    {repo.license && (
                        <span className="license">
                            {getLicense(repo.license)}
                        </span>
                    )}
                    <span className="last-updated">
                        {getLastUpdates(repo.updated_at)}
                    </span>
                    <span className="open-issues">
                        {repo.open_issues_count} open issues
                    </span>
                </p>
            </div>
            <div className="lang-star">
                <span className="lang">{repo.language}</span>
                <span className="stars">
                    {repo.stargazers_count}{' '}
                    <Icon type="star" theme="filled"></Icon>
                </span>
            </div>
            <style jsx>{`
                .root {
                    display: flex;
                    justify-content: space-between;
                }
                .other-info > span + span {
                    margin-left: 10px;
                }
                .root + .root {
                    border-top: 1px solid #eee;
                    padding-top: 20px;
                }
                .repo-title {
                    font-size: 20px;
                }
                .lang-star {
                    display: flex;
                }
                .lang-star > span {
                    width: 120px;
                    text-align: center;
                }
                .repo-desc {
                    width: 400px;
                }
            `}</style>
        </div>
    )
}
