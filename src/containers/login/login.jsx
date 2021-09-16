import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import axios from 'axios'
import { Form, Input, Button, message } from 'antd'
// import PubSub from 'pubsub-js'
import { SyncOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { createLoginAction } from '../../redux/actions/test_actions'

import '../../../node_modules/antd/dist/antd.less'
import './css/login.less'
// import Admin from '../admin/admin'


import logo from '../../static/imgs/logo.png'
import {reqLogin}  from '../../api'



class Login extends Component {


    onFinish = async values => {
        const {username, password} = values       
        // try{
        //     const result = reqLogin(username, password)
        //     if (result.data.status === 0) alert(`Welcome to system ${username}`)
        //     else alert(`Your username ${username} is not existed`)
        // }catch(err){
        //     console.log(err)
        // }
        const result = await reqLogin(username, password)
        
        if (result.status === 0){
            message.success("Welcome to the System", 1) 
            // console.log(result.data)
            this.props.loginAction(result.data)
            // PubSub.publish('headerInfo', { userName: username })
            this.props.history.replace('/admin/home')
            
            
        } else message.warning(result.msg, 1)

        
        
    };

    

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (!this.props.login.isLogin){
            return (
                <div className="login">
                    <header>
                        <img className="logo" src={logo} alt="logo" />
                        <h1>Product Management System</h1>
                    </header>
                    <section className="loginSection">
                        <h1>User Login</h1>
                        <Form
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                // label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                    {
                                        min: 4,
                                        message: "Your username is at least 4 characters!"
                                    },
                                    {
                                        max: 12,
                                        message: "Your username is at most 12 characters!"
                                    },
                                    {
                                        pattern: /^\w+$/,
                                        message: "You name should have char number or _!"
                                    }
                                ]}
                            >
                                <Input prefix={<SyncOutlined spin />} placeholder="Please input your username" />
                            </Form.Item>
                            <Form.Item
                                // label="Password"
                                name="password"
                                rules={[
                                    {
                                        validator: (rule, value) => {
                                            if (!value) {
                                                return Promise.reject("Password is required!")
                                            } else if (value.length > 12) {
                                                return Promise.reject("Password is at most 12 chars!")
                                            } else if (value.length < 4) {
                                                return Promise.reject("Password is at least 4 chars!")
                                            } else if (!(/^\w+$/).test(value)) {
                                                return Promise.reject("Password is number, char or _!")
                                            } else {
                                                return Promise.resolve()
                                            }
                                        }
                                    }
                                ]}
                            >
                                <Input.Password prefix={<SyncOutlined spin />} placeholder="Please input your password" />
                            </Form.Item>
                            <Form.Item
                            >
                                <Button type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </section> 
                </div>
            )
        }else {
            return <Redirect to="/admin/home"/>
        }
        
    }
}

export default connect(
    state => ({ login: state.loginReducer }),
    {
        loginAction: createLoginAction,
    }
)(Login)
