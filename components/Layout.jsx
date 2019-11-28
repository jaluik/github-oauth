import { useState, useCallback } from 'react'
import { Button, Layout, Icon, Input, Avatar } from 'antd'
import Container from './Container'
const { Header, Content, Footer } = Layout

const githubIconStyle = {
    color: 'white',
    fontSize: '40px',
    display: 'block',
    paddingTop: 10,
    marginRight: 20,
}
const footerStyle = {
    textAlign: 'center',
}

export default ({ children }) => {
    const [search, setSearch] = useState('')
    const handleSearchChange = useCallback(
        () => event => {
            setSearch(event.target.value)
        },
        []
    )
    const handleOnSearch = useCallback(() => {}, [])
    return (
        <Layout>
            <Header>
                <Container renderer={<div className="header-inner"></div>}>
                    <div className="header-left">
                        <div className="logo">
                            <Icon type="github" style={githubIconStyle} />
                        </div>
                        <div>
                            <Input.Search
                                placeholder="搜索仓库"
                                value={search}
                                onChange={handleSearchChange}
                                onSearch={handleOnSearch}
                            ></Input.Search>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user">
                            <Avatar size={40} icon={'user'} />
                        </div>
                    </div>
                </Container>
            </Header>
            <Content>
                <Container>{children}</Container>
            </Content>
            <Footer style={footerStyle}>
                Develop by Jaluik @
                <a href="mailto:cqzhengmouren@gmail.com">
                    cqzhengmouren@gmail.com
                </a>
            </Footer>
            <style jsx>{`
                .header-inner {
                    display: flex;
                    justify-content: space-between;
                }
                .header-left {
                    display: flex;
                    justify-content: space-start;
                }
            `}</style>
            <style jsx global>
                {`
                    #__next {
                        height: 100%;
                    }
                    .ant-layout {
                        height: 100%;
                    }
                    .ant-layout-header {
                        padding-left: 0px;
                        padding-right: 0px;
                    }
                `}
            </style>
        </Layout>
    )
}
