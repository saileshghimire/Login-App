import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie"

// export const AuthorizedUser = ({ children }: { children: React.ReactNode }) => {
//     const token = document.cookie
//         .split('; ')
//         .find(row => row.startsWith('token='))
//         ?.split('=')[1];

//     if (!token) {
//         return <Navigate to="/notauthorized" replace />;
//     }

//     return children;
// };

export const AuthorizedUser = ({ children }: { children: React.ReactNode }) => {
    const token = Cookies.get('token'); // Using js-cookie to get the 'token' cookie

    if (!token) {
        return <Navigate to="/notauthorized" replace />;
    }

    return children;
};