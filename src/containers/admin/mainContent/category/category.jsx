import React, { Component } from 'react'
import { Button, Card, Table, Modal, Input, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import 'antd/dist/antd.less'
import './css/category.less'
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../../../api/index'
import { PAGE_SIZE } from '../../../../config/index'


export default class category extends Component {

  state = {
    categoryList: [],
    setVisible: false,
    operationType: "",
    saveCategory: {},
    isLoading: true
  }

  componentDidMount() {
    this.getCategoryList()
  }
  getCategoryList = async () => {
    const result = await reqCategoryList()
    this.setState({ categoryList: result.data.data, isLoading: false })
  }
  handleAddCategory = () => {
    this.setState({ setVisible: true, operationType: "add" })
  }
  handleOk = async () => {
    // console.log(this.input1.state.value)
    const { operationType,saveCategory } = this.state
    if (operationType === "add") {
      this.setState({saveCategory: {}})
      // const result1 = await reqCategoryList()
      // const result2 = result1.data.data.filter(category => {
      //   return category.name.toLowerCase() === this.input1.state.value.toLowerCase()
      // })
      // if (result2.length !== 0) {
      //   message.warning('This category has already been existed!')
      //   this.input1.state.value = ""
      //   // console.log(this.input1)
      // } else {
      //   reqAddCategory(this.input1.state.value)
      //   message.success('You have already successfully added a category')
        
      const result = await reqAddCategory(this.input1.state.value)
      if (result.data.status !== 1){
        message.success('You have already successfully added an category')
        let categoryList = [...this.state.categoryList]
        categoryList.unshift(result.data.data)
        this.input1.state.value = ""
        this.setState({ setVisible: false, categoryList })
      }else{
        this.input1.state.value = ""
        message.warning(result.data.msg)
      }
                  
    } else {      
      const result1 = await reqUpdateCategory(this.input1.state.value, saveCategory._id)
      if (result1.data.status !== 1){
        message.success('You have already successfully edited an category')
        // let categoryList = [...this.state.categoryList]
        // const newList = categoryList.map((categoryObj)=>{
        //   if (categoryObj._id === saveCategory._id) {
        //     return {...categoryObj, name: this.input1.state.value}
        //   }else return categoryObj
        // })
        // this.setState({ setVisible: false, categoryList: newList })
        this.getCategoryList()
        this.input1.state.value = ""
        this.setState({ setVisible: false })
      }else{
        this.input1.state.value = ""
        message.warning(result1.data.msg)
      }
    }

  }
  handleCancel = () => {
    this.setState({ setVisible: false })
  }

  handleEditCategory = (category) => {
    this.setState({ setVisible: true, operationType: "update", saveCategory: category})
  }

  render() {
    const { operationType, categoryList } = this.state
    const dataSource = categoryList

    const columns = [
      {
        title: 'Category',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Edit',
        // dataIndex: 'name',
        key: 'edit',
        align: 'center',
        width: '25%',
        render: (category) => { return <Button type="link" onClick={() => { this.handleEditCategory(category) }}>Edit Category</Button> }
      },
    ]
    return (
      <Card extra={<Button icon={<PlusOutlined />} onClick={this.handleAddCategory} type="primary">Add Category</Button>}>
        <Modal
          title={operationType === "add" ? "Please input what category you want to add" : "Please input a new category"}
          visible={this.state.setVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input ref={c => this.input1 = c} placeholder={"Input New Category"} />
        </Modal>
        <Table dataSource={dataSource}
          columns={columns}
          bordered
          rowKey="_id"
          pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }} 
          loading={this.state.isLoading}/>
      </Card>
    )
  }
}
