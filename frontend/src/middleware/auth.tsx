import { Navigate } from 'react-router-dom';


export const AuthorizedUser = ({ children }: { children: React.ReactNode }) => {
    const getCookie = (name: string) => {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith(name + '='))
            ?.split('=')[1];

            
        return cookieValue;
    };

    const token = getCookie('token');

    if (!token) {
        return <Navigate to="/notauthorized" replace />;
    }

    return children;
};
