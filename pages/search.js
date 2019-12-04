import { withRouter } from 'next/router'
import { Row, Col, List } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
const api = require('../lib/api')

const LANGUAGE = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'Java', 'Rust']

const SORT_TYPES = [
    {
        name: 'Best Match',
    },
    {
        name: 'Most Stars',
        value: 'starts',
        order: 'desc',
    },
    {
        name: 'Fewest Stars',
        value: 'starts',
        order: 'asc',
    },
    {
        name: 'Most Forks',
        value: 'forks',
        order: 'desc',
    },
    {
        name: 'Fewest Forks',
        value: 'forks',
        order: 'asc',
    },
]
/**
 * sort: 排序方式
 * order: 排序顺序
 * lang: 仓库的开发主语言
 * page: 分页页面
 */

const selectedItemStyle = {
    borderLeft: '2px solid #e36209',
    fontWeight: 100,
}

const Search = ({ router, repos }) => {
    console.log(repos)

    const { sort, order, lang, query } = router.query

    const handleLanguageChange = language => {
        Router.push({
            pathname: '/search',
            query: {
                query,
                lang: language,
                sort,
                order,
            },
        })
    }
    const handleSortChange = sort => {
        Router.push({
            pathname: '/search',
            query: {
                query,
                lang,
                sort: sort.value,
                order: sort.order,
            },
        })
    }
    return (
        <div className="root">
            <Row gutter={20}>
                <Col span={6}>
                    <List
                        bordered
                        header={<span className="list-header">语言</span>}
                        style={{ marginBottom: 20 }}
                        dataSource={LANGUAGE}
                        renderItem={item => {
                            const selected = lang === item

                            return (
                                <List.Item
                                    style={selected ? selectedItemStyle : null}
                                >
                                    <a
                                        onClick={() =>
                                            handleLanguageChange(item)
                                        }
                                    >
                                        {item}
                                    </a>
                                </List.Item>
                            )
                        }}
                    />
                    <List
                        bordered
                        header={<span className="list-header">排序</span>}
                        dataSource={SORT_TYPES}
                        renderItem={item => {
                            let selected = false
                            if (item.name === 'Best Match' && !sort) {
                                selected = true
                            } else if (
                                item.value === sort &&
                                item.order === order
                            ) {
                                selected = true
                            }
                            return (
                                <List.Item
                                    style={selected ? selectedItemStyle : null}
                                >
                                    <a onClick={() => handleSortChange(item)}>
                                        {item.name}
                                    </a>
                                </List.Item>
                            )
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

Search.getInitialProps = async ({ ctx }) => {
    const { query, sort, lang, order, page } = ctx.query
    if (!query) {
        return {
            repos: {
                totalNumber: 0,
            },
        }
    }
    let queryString = `?q=${query}`
    if (lang) queryString += `+language:${lang}`
    if (sort) queryString += `&sort=${sort}&order=${order || 'desc'}`
    if (page) queryString += `&page=${page}`

    const result = await api.request(
        {
            url: `/search/repositories${queryString}`,
        },
        ctx.req,
        ctx.res
    )

    return {
        repos: result.data,
    }
}

export default withRouter(Search)
