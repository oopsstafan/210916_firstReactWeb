import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { createLogoutAction } from '../../redux/actions/test_actions'
import NaviList from './naviList/naviList'
import HeaderList from './headerList/headerList'
import MainContent from './mainContent/mainContent'
import { reqUserCookie } from '../../api/index'
import 'antd/dist/antd.less'
import './css/admin.less'
import logo from '../../static/imgs/logo.png'



class Admin extends Component {
    

    componentDidMount() {
        this.checkUserCookie()
    }

    checkUserCookie = async () => {
        const result = await reqUserCookie()
        if (result.data.status !== 0) {
            this.props.logoutAction()
        } 
    }


    render() {
        const { Header, Footer, Sider, Content } = Layout
        const { isLogin } = this.props.login
        if (!isLogin) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <Layout className="admin">
                    <Sider className="sider">
                        <img className="logo" src={logo} alt="logo" />
                        <h1 className="siderHeader">Management System</h1>
                        <NaviList />
                    </Sider>
                    <Layout className="rightLayout">
                        <Header className="rightLayoutHeader">
                            <HeaderList />
                        </Header>
                        <Content className="rightLayoutContent">
                            <MainContent />
                        </Content>
                        <Footer className="rightLayoutFooter">We recommand to use Chrome browser to get the best online experience</Footer>
                    </Layout>

                </Layout>

            )
        }

    }
}


export default connect(
    state => ({ login: state.loginReducer }),
    {
        logoutAction: createLogoutAction,
    }
)(withRouter(Admin))