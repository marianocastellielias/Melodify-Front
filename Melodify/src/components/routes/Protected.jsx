import { Navigate } from 'react-router-dom';
import { AuthenticationContext } from '../services/authentication/AuthenticationContext';
import PropTypes from 'prop-types';
import { useContext } from 'react';

const Protected = ({ children, requiredRoles }) => {
    const { user } = useContext(AuthenticationContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRoles: PropTypes.arrayOf(PropTypes.string),  
};

export default Protected;