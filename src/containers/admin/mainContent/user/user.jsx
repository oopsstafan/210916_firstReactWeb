import React from 'react'
import { Button, Card, Input, Form, message, Table, Modal, Select } from 'antd'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import { PAGE_SIZE } from '../../../../config/index'
import { reqUsersList, reqRoleList, reqAddUser, reqDeleteUser, reqUpdateUser } from '../../../../api/index'


const { Option } = Select
const { confirm } = Modal
export default function User() {

    const [usersList, setUsersList] = React.useState([])
    const [roleList, setRoleList] = React.useState([])
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [operType, setOperType] = React.useState('')
    const [currentUser, setCurrentUser] = React.useState({})
    const [form] = Form.useForm()
    React.useEffect(() => {
        getUsersList()
        getRoleList()
    }, [])

    const getUsersList = async () => {
        const result = await reqUsersList()
        // console.log(result.data.data.users)
        setUsersList([...result.data.data.users])
    }
    const getRoleList = async () => {
        const result = await reqRoleList()
        // console.log(result.data.data)
        setRoleList([...result.data.data])
    }

    const handleAddModal = () => {
        setOperType('add')

        setIsModalVisible(true)
    }
    const handleModalOk = () => {
        form.submit()
        setIsModalVisible(false)
    }
    const handleAddModalCancel = () => {
        form.resetFields()
        setIsModalVisible(false)
    }
    const handleFormSubmit = async (value) => {
        // const {username, password, phone, email, role_name} = value
        // console.log(value)
        if (operType === 'add') {
            const result = await reqAddUser(value)
            // console.log(result)
            if (result.data.status === 0) {
                message.success('You have successfully added a user')
                getUsersList()
            }
            form.resetFields()
        }else {
            const result = await reqUpdateUser({...value, _id: currentUser._id})
            if (result.data.status === 0) {
                message.success('You have successfully edited a user')
                getUsersList()
                form.resetFields()
            }else {
                message.error(result.data.msg)
                form.resetFields()
            }
        }

    }

    const handleDelete = (user) => {
        // console.log(user)
        confirm({
            title: 'Do you Want to delete this user??',
            icon: <ExclamationCircleOutlined />,
            content: 'If you delete you lose all the info about this user',
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.data.status === 0) message.success('You have successfully deleted this user!')
                getUsersList()
            },
            onCancel: () => {
                return
            },
        });

    }

    const handleEdit = (user) => {
        setOperType('edit')
        form.setFieldsValue({
            username: user.username,
            phone: user.phone,
            email: user.email,
            role_name: user.role_name
        })
        setCurrentUser({ ...user })
        setIsModalVisible(true)
    }

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (create_time) => new Date(create_time).toDateString()

        },
        {
            title: 'Role',
            dataIndex: 'role_name',
            key: 'role_name',
        },
        {
            title: 'Operation',
            // dataIndex: 'Edit',
            key: 'operation',
            render: (user) => {
                return (
                    <section>
                        <Button type="link" onClick={() => handleEdit(user)}>Edit</Button>
                        <Button type="link" onClick={() => handleDelete(user)}>Delete</Button>
                    </section>
                )
            }
        },
    ];

    return (
        <Card
            title={
                <Button type="primary" onClick={handleAddModal}><PlusOutlined />Add User</Button>
            }
        >
            <Modal
                title={operType === 'add' ? 'Add Users' : 'Edit Users'}
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleAddModalCancel}

            >
                <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    labelCol={{ span: 5 }}
                // initialValues={{
                //     username: operType=== 'add'?'1':'2'
                // }}

                >
                    <Form.Item
                        name="username"
                        label="User Name"
                        rules={[{ required: true, message: 'User name cannot be blank!' }]}
                    >
                        <Input placeholder="Please input user name!" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Password cannot be blank!' }]}
                    >
                        <Input placeholder="Please input password!" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Phone cannot be blank!' }]}
                    >
                        <Input placeholder="Please input phone number!" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Email cannot be blank!' }]}
                    >
                        <Input placeholder="Please input email!" />
                    </Form.Item>
                    <Form.Item
                        name="role_name"
                        label="Role"
                        rules={[{ required: true, message: 'Role name cannot be blank!' }]}
                    >
                        <Select placeholder="Select role">
                            {
                                roleList.map(role => {
                                    return (
                                        <Option
                                            value={role.name}
                                            key={role._id}
                                        >
                                            {role.name}
                                        </Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
            <Table
                dataSource={usersList}
                columns={columns}
                bordered
                rowKey="_id"
                pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
            />

        </Card>
    )

}
