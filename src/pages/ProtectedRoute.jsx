import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    console.log(useSelector((state) => state.user.currentUser))
//   const { user } = useSelector((state) => state.user.currentUser);
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};
export default ProtectedRoute;