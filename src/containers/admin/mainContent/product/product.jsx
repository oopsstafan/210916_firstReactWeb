import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Button, Card, Table, Input, Select, Form, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { reqProductList, reqUpdateProductStatus, reqSearchProduct } from '../../../../api/index'
import {PAGE_SIZE} from '../../../../config/index'
import {createShowDetailAction, createSaveProdListAction} from '../../../../redux/actions/test_actions'
import 'antd/dist/antd.less'
import './css/product.less'
const { Option } = Select;
class product extends Component {

    state = {
        searchType: "",
        productsList: [],
        totalProducts: '',
        keyWord: ''
    }
    componentDidMount() {
        this.getProductList()
    }
    getProductList = async (pageNumber=1) => {
        const {searchType, keyWord} = this.state
        let result = []
        if (this.isSearching) {
            result = await reqSearchProduct(pageNumber, PAGE_SIZE, searchType, keyWord)
            // console.log(pageNumber, 5, searchType, keyWord)
            // console.log(result.data.data)
            this.setState({
                productsList: result.data.data.list,
                totalProducts: result.data.data.total
            })
            this.props.saveProdListAction(result.data.data.list)
        } else {
            result = await reqProductList(pageNumber, PAGE_SIZE)
            // console.log(result.data.data)
            this.setState({
                productsList: result.data.data.list,
                totalProducts: result.data.data.total,
            })
            this.props.saveProdListAction(result.data.data.list)
        }

    }

    onFinish = async (value) => {
        const { searchType } = this.state
        const { keyWord } = value
        console.log(searchType + '  hahaha  ' + keyWord)
        if (keyWord !== '') {
            // const result = await reqSearchProduct(pageNum,5,searchType,keyWord)
            // console.log(result.data.data)
            // this.setState({searchResultList: result.data.data.list, isSearching: true, totalSearchResult: result.data.data.total})
            this.setState({keyWord})
            this.isSearching = true
            this.getProductList()
        } else {
            this.isSearching = false
            this.getProductList()
        }

    }
    handleSearchChange = (value) => {
        this.setState({ searchType: value })
        // console.log(value)
    }
    handleUpdateProduct = async (product) => {
        let result = ''
        if (product.status === 1) result = await reqUpdateProductStatus(product._id, 2)
        else result = await reqUpdateProductStatus(product._id, 1)
        this.getProductList()
        if (result.data.status === 0) message.success('product updated successfully')
        else message.warning(result.data.msg)

    }

    handleAddProduct = ()=>{
        // console.log(this.props.history)
        this.props.history.push('/admin/product/edit/add_product')
    }

    render() {
        const { productsList } = this.state
        const dataSource = productsList
        // const dataSource = searchResultList

        const columns = [
            {
                title: 'Product',
                dataIndex: 'name',
                key: 'productName',
                width: '20%'

            },
            {
                title: 'Product Description',
                dataIndex: 'desc',
                key: 'productDescription',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: '6%',
                render: (price) => "$" + price
            },
            {
                title: 'Status',
                // dataIndex: 'status',
                key: 'status',
                width: '10%',
                render: (product) => {
                    if (product.status === 1) {
                        return (
                            <section>
                                <Button type="primary" style={{backgroundColor: 'red'}} onClick={() => { this.handleUpdateProduct(product) }}>Pull Off</Button>
                                <div>In Stock</div>
                            </section>
                        )
                    } else {
                        return (
                            <section>
                                <Button type="primary" onClick={() => { this.handleUpdateProduct(product) }}>Pull on</Button>
                                <div>Out of Stock</div>
                            </section>
                        )
                    }

                }
            },
            {
                title: 'Edit',
                // dataIndex: 'edit',
                key: 'edit',
                width: '10%',
                render: (product) => {
                    const detailPath = '/admin/product/detail/' + product._id
                    const editPath = '/admin/product/edit/' + product._id
                    // this.props.showDetailAction(product)
                    return (
                        <section>
                            {/* <Button type="link" onClick={() => { this.handleDetails(product) }}>Details</Button> */}
                            {/* <Button type="link" onClick={() => { this.handleEdit(product) }}>Edit</Button> */}
                            <Link to={detailPath}>Detail</Link><br />
                            <Link to={editPath}>Edit</Link>                           
                        </section>

                    )
                }
            },
        ]
        return (
            <Card title={<Form
                name="searchForm"
                layout="inline"
                onFinish={this.onFinish}
            >
                <Form.Item>
                    <Select placeholder="Select Search Type" style={{ width: 180 }} onSelect={this.handleSearchChange} allowClear>
                        <Option value="productName">Search by Name</Option>
                        <Option value="productDesc">Search by Description</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="keyWord">
                    <Input
                        type="text"
                        placeholder="keyword"
                        // value={value.number || number}
                        // onChange={onNumberChange}
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                </Form.Item>
            </Form>}
                extra={<Button icon={<PlusOutlined />} onClick={this.handleAddProduct} type="primary">Add Product</Button>}>

                <Table dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey="_id"
                    pagination={{
                        pageSize: PAGE_SIZE,
                        total: this.state.totalProducts,
                        onChange: this.getProductList
                    }}
                />
                
                
            </Card>
        )
    }
}

export default connect(
    state => ({ productObj: state.showDetailReducer }),
    {
        showDetailAction: createShowDetailAction,
        saveProdListAction: createSaveProdListAction
    }
)(product)



