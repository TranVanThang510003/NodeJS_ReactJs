import React from 'react';
import { Modal, Button, Row, Col, message } from 'antd';
import { createUserApi } from '../../util/api.ts'; // Bạn cần viết hàm này

const SelectPlanModal = ({ registerData, onClose }) => {


  const handleSelect = async (plan) => {
    try {
      const dataWithPlan = {
        ...registerData,
        accountType: plan,
      };
      const res = await createUserApi(
        dataWithPlan.name,
        dataWithPlan.email,
        dataWithPlan.password,
        dataWithPlan.accountType
      );

      if (res.success) {
        message.success(`Đăng ký thành công với gói ${plan}`);
        onClose();
      } else {
        message.error(res.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      console.error(error);
      message.error('Lỗi khi đăng ký: ' + (error.response?.data?.message || ''));
    }
  };

  return (
    <Modal open title="Chọn gói dịch vụ" onCancel={onClose} footer={null} centered>
      <p>Chào mừng bạn! Hãy chọn một trong hai gói dịch vụ bên dưới để bắt đầu trải nghiệm:</p>

      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <div className="border rounded-lg p-4 h-full text-center">
            <h3 className="text-lg font-semibold">Gói Miễn Phí</h3>
            <p>• Xem phim cơ bản</p>
            <p>• Có quảng cáo</p>
            <Button onClick={() => handleSelect('free')} type="default" className="mt-3">
              Chọn gói Free
            </Button>
          </div>
        </Col>

        <Col span={12}>
          <div className="border rounded-lg p-4 h-full text-center">
            <h3 className="text-lg font-semibold text-yellow-600">Gói Premium</h3>
            <p>• Xem không giới hạn</p>
            <p>• Không quảng cáo</p>
            <p>• Chất lượng cao</p>
            <p><strong>Giá: 99.000đ/tháng</strong></p>
            <Button type="primary" onClick={() => handleSelect('premium')} className="mt-3">
              Chọn gói Premium
            </Button>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-6">
        <Button type="link" onClick={() => handleSelect('free')}>
          Bỏ qua, chọn sau
        </Button>
      </div>
    </Modal>
  );
};
export default SelectPlanModal