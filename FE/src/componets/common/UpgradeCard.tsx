import React from "react";
import { Button, message } from 'antd';
import { useDispatch } from "react-redux";
import { updateAccountType } from "../../features/authSlice.js";
import { updateAccountTypeApi } from '../../util/api';
import {AppDispatch} from "../../redux/store";

interface UpgradeCardProps {
  onClose: () => void;
}
const UpgradeCard:React.FC<UpgradeCardProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleUpgrade = async () => {
    try {
      const res = await updateAccountTypeApi("premium");
      if (res.data && res.data.success) {
        // cập nhật Redux store
        dispatch(updateAccountType("premium"));

        message.success("Nâng cấp thành công! Bạn đã trở thành Premium 🎉");
        onClose?.();
      } else {
        message.error("Nâng cấp thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi nâng cấp:", error);
      message.error("Có lỗi xảy ra khi nâng cấp tài khoản.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-700 to-purple-600 text-white rounded-lg p-6 w-full max-w-sm shadow-lg">
      <h2 className="text-xl font-bold mb-1">Premium</h2>

      <div className="bg-white text-black rounded-lg p-4 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Giá hàng tháng</p>
          <p className="text-lg font-semibold">114.000 ₫</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Nội dung</p>
          <p className="font-medium">Xem tất cả các tập, bao gồm nội dung Premium</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Độ phân giải</p>
          <p className="font-medium">1080p (HD)</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Quảng cáo</p>
          <p className="font-medium">Không quảng cáo</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button type="primary" onClick={handleUpgrade}>
            Nâng cấp ngay
          </Button>
          <Button onClick={onClose}>
            Để sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeCard;
