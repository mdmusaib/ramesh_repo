import React, { Component } from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import UserService from '../../../Services/UserService';
import { userServiceVariables } from '../../../Constants/ServiceConstants';
import { ErrorNotification } from '../../../Components/Toaster/toaster';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.signupServive = new UserService();
    }
    
    handleSignup =(value)=>{
        this.signupServive.userService(userServiceVariables.Signup, value).then(res => {
            this.props.history.push('/otp-verify', {email: res?.data?.userData[0]?.email})
        }).catch(err => {
            ErrorNotification(err.response.data.message)
        })
    }

    signupError =() => {
        console.log("called error")
    }

    render() {
        return(
            <React.Fragment>
                <Row justify="center">
                    <Col lg={8} className="custom-form">
                        <img src="logo.png" alt="Second-App" className="logo" />
                        <Form
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={this.handleSignup}
                            onFinishFailed={this.signupError}
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
                            <Link to="/login"><h4 className="highlight-word pt-15">Already Have A Account ?</h4></Link>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="success-button float-right">
                                    Create Account
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default SignUpPage;