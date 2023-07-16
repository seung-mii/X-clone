import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children } : { children: React.ReactNode }) {
  const user = auth.currentUser;
  
  // 로그인한 사용자는 Protected Route를 볼 수 있게 되고 로그인하지 않은 경우 로그인 페이지로 리다이렉션
  if (user === null) return <Navigate to="/login" />;
  return children;
}