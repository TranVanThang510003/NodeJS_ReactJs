import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo.jsx';
import { createUserApi } from '../../util/api.ts';
import SelectPlanModal from './SelectPlanModal.jsx';

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [registerData, setRegisterData] = useState(null);


  const onFinish = async (values) => {
    setRegisterData(values); // lưu tạm data
    setShowPlanModal(true);  // hiện modal chọn gói
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/img/register.jpg')" }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center">
        <Logo width={60} height={60} />
      </div>

      {/* Form đăng ký */}
      <div className="bg-white/30 backdrop-blur-sm rounded-3xl inline-block max-w-full">
        <Form
          form={form}
          name="register"
          style={{ padding: '40px' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="text-3xl font-bold text-center text-gray-800 mb-8">Register</div>

          <Form.Item
            label={<span className="text-[16px] font-semibold text-gray-800">Username</span>}
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input autoComplete="name" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[16px] font-semibold text-gray-800">Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email format!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-[16px] font-semibold text-gray-800">Password</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password autoComplete="new-password" style={{ width: '400px' }} />
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
            <Input.Password autoComplete="new-password" style={{ width: '400px' }} />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#2f2f2f',
                borderColor: '#2f2f2f',
                color: '#fff',
                height: '48px',
                fontSize: '18px',
                padding: '0 24px',
                borderRadius: '12px',
                fontWeight: 600,
              }}
            >
              Register
            </Button>
            <div className="mt-4 text-sm text-gray-700">
              Already have an account?{' '}
              <span
                className="text-blue-700 hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
            Login here
        </span>
            </div>
          </Form.Item>
        </Form>
      </div>

      {showPlanModal && (
        <SelectPlanModal
          registerData={registerData}
          onClose={() => navigate('/login')} // sau khi đăng ký thành công thì chuyển sang login
        />
      )}
    </div>
  );
};

export default Register;
