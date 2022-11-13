import React from 'react';
import { getCurrentUser } from './../login.service';
import { Navigate } from 'react-router-dom';

const user = getCurrentUser();

function ProtectedRoute({ children }) {
	return user && user.isAdmin ? children : <Navigate to={'not-found'} replace />;
}

export default ProtectedRoute;
