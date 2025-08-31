

import { jwtDecode } from 'jwt-decode';

interface MyTokenPayload {
  id: string;
  email: string;
  accountType?: 'free' | 'premium';
  exp?: number;
  iat?: number;
}

export const getUserInfoFromToken = (): MyTokenPayload | null => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    const decoded = jwtDecode<MyTokenPayload>(token);
    return decoded;
  } catch (err) {
    console.error("Không thể decode token:", err);
    return null;
  }
};

export const isUserPremium = (): boolean => {
  const user = getUserInfoFromToken();
  return user?.accountType === 'premium';
};

