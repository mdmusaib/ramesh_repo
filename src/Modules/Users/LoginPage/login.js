import React, { Component } from 'react';
import { Form, Input, Row, Col, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import UserService from '../../../Services/UserService';
import { userServiceVariables } from '../../../Constants/ServiceConstants';
import {ErrorNotification, SuccessNotification} from '../../../Components/Toaster/toaster';

import './login.scss';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
    }
    login = (value) => {
        this.userService.userService(userServiceVariables.Login, value).then(res => {
            localStorage.setItem("User", JSON.stringify(...res.data.user));
            SuccessNotification("Welcome To My App");
            this.props.history.push('/dummy');
        }).catch(err => {
            return(
                ErrorNotification(err.response.data.message)
            )
        })
    }

    loginError = () => {
        console.log("login failed")
    }

    render() {
        return (
            <React.Fragment>
                <Row justify="center">
                    <Col lg={8} className="custom-form">
                        <img src="logo.png" alt="Second-App" className="logo" />
                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={this.login}
                            onFinishFailed={this.loginError}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Email Id"
                                    },
                                    {
                                        type:'email',
                                        message: "Enter Email Id In Valid Format"
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email Id" />
                            </Form.Item>
                            <Form.Item
                                className=" mb-0"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please Enter Password"
                                    }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Link to="/forgot-password"><h4 className="highlight-word pt-15 float-right">Forgot Password ?</h4></Link>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="success-button mt-15">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                        <Divider type="horizontal" />
                        <Link to="/signup"><h4 className="highlight-word">Create New Account ?</h4></Link>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default LoginPage;