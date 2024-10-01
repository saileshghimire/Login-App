import { Navigate } from 'react-router-dom';


export const AuthorizedUser = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/notauthorized" replace />;
    }

    return children;
};
