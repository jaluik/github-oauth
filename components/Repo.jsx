import Link from 'next/link'
import { Icon } from 'antd'

function getLicense(license) {
    return license ? `${license.spdx_id} license` : ''
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
                    <span className="license">{getLicense(repo.license)}</span>
                    <span className="last-updated">{repo.updated_at}</span>
                    <span className="open-issues">
                        {repo.open_issues_count}{' '}
                        <Icon type="star" theme="filled"></Icon>
                    </span>
                </p>
            </div>
            <div className="lang-star">
                <span className="lang">{repo.language}</span>
                <span className="stars">{repo.stargazers_count}</span>
            </div>
            <style jsx>{``}</style>
        </div>
    )
}
