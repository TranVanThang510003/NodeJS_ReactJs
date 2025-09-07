
import { useSelector } from "react-redux";
import UpgradeCard from "../componets/common/UpgradeCard.tsx";
import { useState } from 'react'

const UserProfile = () => {
  const [showUpgradeCard, setShowUpgradeCard] = useState(false);
  const { user } = useSelector((state) => state.auth);


  if (!user) {
    return <div className="p-6 text-center">Không có dữ liệu người dùng</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-center mt-[-100px] justify-center p-6 ">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {user.name.charAt(0)}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name}
          </h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info */}
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span>{user.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Account Type:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                user.accountType === "premium"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {user.accountType}
            </span>
          </div>
        </div>

        {/* Nút nâng cấp */}
        {user.accountType === "free" && (
          <div className="mt-6">
            <button
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:opacity-90 transition"
              onClick={() => setShowUpgradeCard(true)}
            >
              Nâng cấp tài khoản
            </button>
          </div>
        )}
      </div>

      <div className="lg:ml-6">
        {showUpgradeCard && (
          <UpgradeCard onClose={() => setShowUpgradeCard(false)} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
