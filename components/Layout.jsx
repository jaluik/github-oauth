import { useState, useCallback, useMemo } from 'react'
import {
    Layout,
    Icon,
    Input,
    Avatar,
    Tooltip,
    DropdDropdown,
    Menu,
    Dropdown,
} from 'antd'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import Container from './Container'
import { logout } from '../store/store'
import { withRouter } from 'next/router'
import axios from 'axios'

const { Header, Content, Footer } = Layout
const { publicRuntimeConfig } = getConfig()

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

const MyLayout = ({ children, user, logoutD, router }) => {
    const [search, setSearch] = useState('')
    const handleSearchChange = useCallback(
        () => event => {
            setSearch(event.target.value)
        },
        []
    )
    const handleOnSearch = useCallback(() => {}, [])
    const handleLogout = useCallback(() => {
        logoutD()
    }, [logoutD])
    const handleGoToOauth = useCallback(e => {
        e.preventDefault()
        axios({
            url: '/prepare-auth',
            params: {
                url: router.asPath,
            },
            method: 'get',
        })
            .then(res => {
                if (res.status === 200) {
                    location.href = publicRuntimeConfig.OAUTH_URL
                } else {
                    console.log('prepare auth failed', res)
                }
            })
            .catch(err => {
                console.log('prepare auth failed', err)
            })
    }, [])
    const userDropDown = useMemo(() => (
        <Menu style={{ marginTop: 15, marginLeft: -5 }}>
            <Menu.Item>
                <a onClick={handleLogout}>登 出</a>
            </Menu.Item>
        </Menu>
    ))

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
                            {user && user.id ? (
                                <Dropdown overlay={userDropDown}>
                                    <a href="/">
                                        <Avatar
                                            size={40}
                                            src={user.avatar_url}
                                        />
                                    </a>
                                </Dropdown>
                            ) : (
                                <Tooltip
                                    title="点击进行登录"
                                    placement="bottom"
                                >
                                    <a onClick={handleGoToOauth}>
                                        <Avatar size={40} icon={'user'} />
                                    </a>
                                </Tooltip>
                            )}
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

export default withRouter(
    connect(
        function(state) {
            return {
                user: state.user,
            }
        },
        function mapReducer(dispatch) {
            return {
                logoutD: () => dispatch(logout()),
            }
        }
    )(MyLayout)
)
