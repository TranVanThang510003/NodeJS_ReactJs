
import React from 'react';
import { Button, Form, Input, notification} from 'antd';
import '@ant-design/v5-patch-for-react-19';
import Logo from "../componets/common/Logo.jsx";
import {createUserApi} from "../util/api.js";
import {useNavigate} from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    const onFinish = async(values) => {
       const { name, email, password } = values;
        try {
            const res = await createUserApi(name, email, password);
            console.log("Response:", res); // Log response khi thành công
            if (res.success) {
                notification.success({
                    message: res.message || "Tạo tài khoản thành công!",
                });
                navigate("/login");
            } else {
                notification.error({
                    message: "Lỗi đăng ký",
                    description: res.message || "Có lỗi xảy ra khi tạo tài khoản.",
                });
            }
        } catch (error) {
            console.log("Error:", error); // Log lỗi khi có exception
            notification.error({
                message: "Lỗi đăng ký",
                description: error.message || "Có lỗi xảy ra khi kết nối đến server.",
            });
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
            <div
                className="relative flex justify-center items-center h-screen bg-no-repeat bg-cover"
                style={{ backgroundImage: "url('/img/register.jpg')" }}
            >
                {/* Logo góc trái */}
                <div className="absolute top-4 left-4 flex items-center ">
                    <Logo width={60} height={60} />
                </div>

                {/* Form đăng ký */}
                <div className="bg-white/30 backdrop-blur-sm rounded-3xl inline-block max-w-full">
                    <Form
                        name="register"
                        style={{  padding: "40px" }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                    <div className='text-3xl font-bold text-center text-gray-800' style={{marginBottom:"30px"}}>Register</div>
                        <Form.Item
                            label={<span className="text-[16px] font-semibold text-gray-800">Username</span>}
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input autoComplete="name"/>
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[16px] font-semibold text-gray-800">Email</span>}
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Invalid email format!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[16px] font-semibold text-gray-800">Password</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password autoComplete="new-password" style={{ width: "400px" }}  />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[16px] font-semibold text-gray-800">Confirm</span>}
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password autoComplete="new-password" style={{ width: "400px" }}  />
                        </Form.Item>

                        <Form.Item className="text-center">
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    backgroundColor: '#2f2f2f',
                                    borderColor: '#2f2f2f',
                                    color: '#fff',
                                    height: "48px",
                                    fontSize: "18px",
                                    padding: "0 24px",
                                    borderRadius: "12px",
                                    fontWeight: 600,
                                }}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
    )
}


export default Register;
