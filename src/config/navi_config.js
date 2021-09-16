import { HomeOutlined, AppstoreOutlined, UserOutlined, TeamOutlined, BarChartOutlined } from '@ant-design/icons';
export const naviConfig =  [
    {
        key: 'home',
        icon: <HomeOutlined/>,
        path: '/admin/home',
        title: 'home'
    },

    {
        key: 'productsub',
        icon: <AppstoreOutlined/>,
        title: 'Product',
        children: [
            {
                key: 'category',
                path: '/admin/category',
                title: 'Category'
            },
            {
                key: 'product',
                path: '/admin/product',
                title: 'Prod Management'
            },
        ]
    },

    {
        key: 'user',
        icon: <UserOutlined/>,
        path: '/admin/user',
        title: 'User'
    },

    {
        key: 'role',
        icon: <TeamOutlined/>,
        path: '/admin/role',
        title: 'Role'
    },

    {
        key: 'chartsub',
        icon: <BarChartOutlined/>,
        title: 'Chart',
        children: [
            {
                key: 'barchart',
                path: '/admin/barchart',
                title: 'Bar'
            },
            {
                key: 'linechart',
                path: '/admin/linechart',
                title: 'Line'
            },
            {
                key: 'piechart',
                path: '/admin/piechart',
                title: 'Pie'
            }
        ]
    }
]