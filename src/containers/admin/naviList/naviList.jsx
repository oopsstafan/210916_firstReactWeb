import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'antd';
// import { HomeOutlined, AppstoreOutlined, UserOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';

import { naviConfig } from '../../../config/navi_config'
import { reqRoleByRoleName } from '../../../api/index'

const { SubMenu } = Menu;

class naviList extends PureComponent {
    state = {
        roleMenuList: []
    }
    componentDidMount() {
        this.getRoleByRoleName()
    }
    getRoleByRoleName = async () => {
        const result = await reqRoleByRoleName(this.props.login.roleName)
        this.setState({ roleMenuList: [...result.data.data.menus, 'home'] })
    }

    createNavi = (target) => {
        return target.map((items) => {
            if (this.state.roleMenuList.length !== 0) {
                // console.log(this.state.roleMenuList)
                if (this.state.roleMenuList.includes(items.key)){
                    if (!items.children) {
                        return (
                            <Menu.Item key={items.key} icon={items.icon}>
                                <Link to={items.path}>
                                    {items.title}
                                </Link>
                            </Menu.Item>
                        )
    
                    } else {
                        return (
                            <SubMenu key={items.key} icon={items.icon} title={items.title}>
                                {this.createNavi(items.children)}
                            </SubMenu>
                        )
                    }
                }else return null
                
            }else return null

        })

    }

    render() {
        let isProduct, isChart, isCategory = false
        const { pathname } = this.props.history.location
        const pagePathName = pathname.split('/').reverse()[0]
        const pagePathNameArr = pathname.split('/')
        if (pagePathNameArr.includes('product')||pagePathNameArr.includes('category')) isProduct = true
        if (pagePathNameArr.includes('category')) isCategory = true
        if (pagePathNameArr.includes('barchart')||pagePathNameArr.includes('piechart')||pagePathNameArr.includes('linechart')) isChart = true
        // console.log(isProduct)
        return (
            <Menu
                className="naviList"
                mode="inline"
                theme="dark"
                defaultSelectedKeys={isCategory? ['category']: isProduct? ['product']: [pagePathName]}
                defaultOpenKeys={isProduct? ['productsub']: isChart? ['chartsub']: []}
                // defaultOpenKeys={['']}
            >
                {/* <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/admin/home">
                        Home
                    </Link>
                </Menu.Item>

                <SubMenu key="1" icon={<AppstoreOutlined />} title="Product">
                    <Menu.Item key="category" >
                        <Link to="/admin/category">
                            Category
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="product" >
                        <Link to="/admin/product">
                            Prod Management
                        </Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item key="user" icon={<UserOutlined />}>
                    <Link to="/admin/user">
                        User
                    </Link>
                </Menu.Item>

                <Menu.Item key="role" icon={<TeamOutlined />}>
                    <Link to="/admin/role">
                        Role
                    </Link>
                </Menu.Item>

                <SubMenu key="2" icon={<BarChartOutlined />} title="Chart">
                    <Menu.Item key="barchart" >
                        <Link to="/admin/barchart">
                            Bar
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="linechart" >
                        <Link to="/admin/linechart">
                            Line
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="piechart" >
                        <Link to="/admin/piechart">
                            Pie
                        </Link>
                    </Menu.Item>
                </SubMenu> */}
                {this.createNavi(naviConfig)}
            </Menu>
        )
    }
}

// export default withRouter(naviList)
export default connect(
    state => ({ login: state.loginReducer }),
    {}
)(withRouter(naviList))