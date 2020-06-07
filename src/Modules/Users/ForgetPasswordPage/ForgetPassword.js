import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import UserService from '../../../Services/UserService';
import { userServiceVariables } from '../../../Constants/ServiceConstants';

class ForgetPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.otpService = new UserService();
    }
    handleSendOtp = (value) => {
        if(value) {
            this.otpService.userService(userServiceVariables.Send_Otp, value).then(res => {
                console.log("called", res.data.userData[0].email);
                this.props.history.push('/otp-verify', {email: res?.data?.userData[0]?.email});
            }).catch(err => {
                console.log("called",err)
            });
        }
    }

    otpError = () => {

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
                            onFinish={this.handleSendOtp}
                            onFinishFailed={this.otpError}
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
                            <Link onClick={() => this.props.history.goBack()}><h4 className="highlight-word">Go Back ?</h4></Link>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="success-button float-right">
                                    Send OTP
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default ForgetPasswordPage;