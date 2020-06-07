import React, { Component } from 'react'
import { Row, Col, Form, Button, InputNumber } from 'antd';
import { Link } from 'react-router-dom';
import UserService from '../../../Services/UserService';
import { userServiceVariables } from '../../../Constants/ServiceConstants';
import { ErrorNotification, SuccessNotification } from '../../../Components/Toaster/toaster';

class otpVerification extends Component {
    constructor(props) {
        super(props);
        this.otpService = new UserService();
    }

    componentDidMount() {
        if(!this.props?.location?.state?.email) {
            this.props.history.goBack();
        }
    }

    handleOtp = (value) => {
        if(this.props.location.state.email) {
            const data = {
                otp: value.otp,
                email: this.props.location.state.email
            }
            this.otpService.userService(userServiceVariables.Otp_Verification, data).then(res => {
                SuccessNotification("Welcome To My App");
                localStorage.setItem('User', ...res.data.userDetails);
                this.props.history.push('/dummy');
            }).catch(err => {
                ErrorNotification(err.response.data.message)
            })
        }
    }

    otpError = () => {
        console.log("called error")
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
                            onFinish={this.handleOtp}
                            onFinishFailed={this.otpError}
                        >
                            <Form.Item
                                name="otp"
                                rules={[
                                    { type: 'number', message: "Enter Numbers Only"},
                                    { required: true, message: "Enter OTP" }
                                ]}
                            >
                                <InputNumber className="w-100" placeholder="Enter OTP" maxLength={6}  />
                            </Form.Item>
                            <Link onClick={() => this.props.history.goBack()}><h4 className="highlight-word">Go Back ?</h4></Link>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="success-button float-right">
                                    Verify OTP
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default otpVerification;