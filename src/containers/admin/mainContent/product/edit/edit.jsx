import React, { Component } from 'react'
import { Button, Card, Input, Select, Form, message } from 'antd'
import { Link } from 'react-router-dom'
import {
    LeftOutlined
} from '@ant-design/icons'

import { reqCategoryList, reqProductById, reqAddProduct } from '../../../../../api/index'
import PictureWall from './picture_wall'

const { Option } = Select
export default class edit extends Component {
    formRef = React.createRef()
    picRef = React.createRef()
    state = {
        categoryList: [],
        productList: {},
        operationType: ""
    }

    componentDidMount() {
        const { id } = this.props.match.params
        // console.log(id)
        this.getCategoryList()
        if (id !== "add_product") {
            this.reqProductById()
            this.setState({ operationType: "editPorduct" })
        } else this.setState({ operationType: "addPorduct" })

    }
    reqProductById = async () => {
        const { id } = this.props.match.params
        const result = await reqProductById(id)
        console.log(result.data.data)
        this.setState({ productList: result.data.data })
        this.formRef.current.setFieldsValue({
            name: result.data.data.name,
            description: result.data.data.desc,
            price: result.data.data.price,
            category: result.data.data.categoryName,
            detail: result.data.data.detail
        })


    }
    getCategoryList = async () => {
        const result = await reqCategoryList()
        this.setState({ categoryList: [...result.data.data] })

    }

    onFinish = async (values) => {
        const { name, description, price, category, detail } = values
        let imgArr = [...this.picRef.current.getImgArr()]
        console.log(imgArr)
        console.log(values)
        const product = {
            categoryName: category,
            name,
            price,
            desc: description,
            status: 1,
            imgs: imgArr,
            detail
        }
        const result = await reqAddProduct(product)
        if (result.data.status === 0) message.success('You have successfully added a product')
        else message.error(result.data.msg)
    }
    render() {
        const { id } = this.props.match.params
        return (
            <Card
                title={
                    <div>
                        <Button type="link"><Link to="/admin/product"><LeftOutlined /></Link></Button>Product Management
                    </div>
                }
                style={{ height: '100%' }}
            >
                <Form
                    name="nest-messages"
                    onFinish={this.onFinish}
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 6 }}
                    ref={id !== "add_product" ? this.formRef : ""}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input value="hello" />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" addonBefore="$" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Please choose category">
                            {
                                this.state.categoryList.map(category => {
                                    return <Option key={category._id} value={category.name}>{category.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="picture" 
                        label="Picture"
                        wrapperCol={{ span: 8 }}
                    >
                        <PictureWall ref={this.picRef}/>
                    </Form.Item>
                    <Form.Item name="detail" label="Detail" >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )

    }
}
