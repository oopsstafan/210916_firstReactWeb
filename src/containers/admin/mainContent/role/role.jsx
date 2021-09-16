import React from 'react'
import { Button, Card, Input, Form, message, Table, Modal, Tree } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { PAGE_SIZE } from '../../../../config/index'
import { reqRoleList, reqAddRole, reqUpdateRole } from '../../../../api/index'
import { naviConfig } from '../../../../config/navi_config'



export default function Role() {
    const [roleList, setRoleList] = React.useState([])
    const [isAddModalVisible, setIsAddModalVisible] = React.useState(false)
    const [isEditModalVisible, setIsEditModalVisible] = React.useState(false)
    const [currentRole, setCurrentRole] = React.useState({})
    const [checkedKeys, setcheckedKeys] = React.useState([])

    React.useEffect(() => {
        getRoleList()
    }, [])
    const getRoleList = async () => {
        const result = await reqRoleList()
        setRoleList([...result.data.data])
    }

    const handleAddModal = () => {
        setIsAddModalVisible(true)
    }
    const handleEditModal = (edit) => {
        setCurrentRole(edit)
        setIsEditModalVisible(true)
        let result = roleList.find(item=>{
            return item._id === edit._id
        })
        console.log(result.menus)
        setcheckedKeys(result.menus)
    }

    const handleAddModalCancel = () => {
        addForm.resetFields()
        setIsAddModalVisible(false)
    }
    const handleEditModalCancel = () => {
        setIsEditModalVisible(false)
    }

    const handleAddModalOk = () => {
        addForm.submit()
        setIsAddModalVisible(false)
    }
    const handleEditModalOk = async () => {
        let username = localStorage.getItem('username')
        const newRole = {...currentRole, menus:checkedKeys, auth_name:username}
        // console.log(newRole)
        const result = await reqUpdateRole(newRole)
        getRoleList()
        // console.log(result)
        setIsEditModalVisible(false)
    }

    const handleAddFormSubmit = async (value) => {
        console.log(value)
        const result = await reqAddRole(value.roleName)
        console.log(result.data)
        if (result.data.status === 0) {
            message.success('You have successfully added a new role')
            getRoleList()
        } else message.error(result.data.msg)
        addForm.resetFields()
    }

    const onTreeMenuCheck = (_, event) => {
        const result1 = event.checkedNodes.map(node=>{
            return node.key
        })
        setcheckedKeys(result1)
    }


    const [addForm] = Form.useForm()
    const dataSource = roleList
    const columns = [
        {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (create_time) => new Date(create_time).toDateString()

        },
        {
            title: 'Auth Time',
            dataIndex: 'auth_time',
            key: 'auth_time',
            render: (auth_time) => new Date(auth_time).toDateString()

        },
        {
            title: 'Auth Name',
            dataIndex: 'auth_name',
            key: 'auth_name',
        },
        {
            title: 'Edit',
            // dataIndex: 'Edit',
            key: 'operation',
            render: (edit) => {
                return (
                    <Button type="link" onClick={() => { handleEditModal(edit) }}>Edit Role</Button>
                )
            }
        },
    ];


    return (
        <Card
            title={
                <Button type="primary" onClick={handleAddModal}><PlusOutlined />Add Role</Button>
            }
        >
            <Modal
                title="Add Role"
                visible={isAddModalVisible}
                onOk={handleAddModalOk}
                onCancel={handleAddModalCancel}
            >
                <Form form={addForm} onFinish={handleAddFormSubmit}>
                    <Form.Item
                        name="roleName"
                        rules={[{ required: true, message: 'Role name cannot be blank!' }]}
                    >
                        <Input placeholder="Please input role name!" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Edit Role"
                visible={isEditModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
            >
                Role Name:&nbsp; <Input value={currentRole.name} disabled={true} style={{width: '80%'}}/>
                <hr />
                <Tree
                    checkable
                    defaultExpandedKeys={['productsub', 'chartsub']}
                    checkedKeys={checkedKeys}
                    onCheck={onTreeMenuCheck}
                    treeData={naviConfig}
                />
            </Modal>

            <Table dataSource={dataSource}
                columns={columns}
                bordered
                rowKey="_id"
                pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
            // loading={this.state.isLoading} 
            />

        </Card>
    )
}