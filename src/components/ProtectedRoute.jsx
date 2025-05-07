import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/#login" replace />;
  }

  return children;
};

export default ProtectedRoute;