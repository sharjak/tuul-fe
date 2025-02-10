import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
