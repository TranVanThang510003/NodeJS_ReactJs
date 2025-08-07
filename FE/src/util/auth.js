import { jwtDecode } from 'jwt-decode';


export const getUserInfoFromToken = () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded; // ví dụ: { id, email, accountType: 'premium' }
  } catch (err) {
    console.error("Không thể decode token:", err);
    return null;
  }
};

export const isUserPremium = () => {
  const user = getUserInfoFromToken();
  console.log(user)
  return user?.accountType === 'premium';
};
