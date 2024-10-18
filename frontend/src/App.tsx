
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Username } from "./components/Username";
import { Reset } from "./components/Reset";
import { Register } from "./components/Register";
import { Recovery } from "./components/Recovery";
import { Profile } from "./components/Profile";
import { Password } from "./components/Password";
import { PageNotFound } from "./components/PageNotFound";
import { OtpForm } from './components/OtpForm';
import { Message } from './components/Message';
import { NotAuthorized } from './components/NotAuthorized';
import { AuthorizedUser } from './middleware/auth';
import { ForgetPassword } from './components/ForgetPassword';



const router = createBrowserRouter([
  {
    path:'/',
    element: <Username></Username>
  },
  {
    path:'/notauthorized',
    element: <NotAuthorized></NotAuthorized>
  },
  {
    path:'/register',
    element: <Register></Register>
  },
  {
    path:'/password',
    element: <Password></Password>
  },
  {
    path:'/profile',
    element: <Profile></Profile>
  },
  {
    path:'/recovery',
    element: <Recovery></Recovery>
  },
  {
    path:'/reset',
    element: <Reset></Reset>
  },
  {
    path:'/otp',
    element: <OtpForm></OtpForm>
  },
  {
    path:'/message',
    // element: <Message></Message>
    element: <AuthorizedUser><Message></Message></AuthorizedUser> 
  },
  {
    path:'/forgetpassword',
    element: <ForgetPassword></ForgetPassword>
    // element: <AuthorizedUser><ForgetPassword></ForgetPassword></AuthorizedUser> 
  },
  {
    path:'*',
    element: <PageNotFound></PageNotFound>
  },
])

function App() {

  return (
    <main>
    <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
