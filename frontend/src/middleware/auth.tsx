import { Navigate } from 'react-router-dom';


export const AuthorizedUser = ({ children }: { children: React.ReactNode }) => {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

    if (!token) {
        return <Navigate to="/notauthorized" replace />;
    }

    return children;
};
