import { toast } from "react-hot-toast";


interface Values {
    username?: string;
    password?: string;
    email?:string;
    confrimPassword?:string;
}

// Define the type for the error object
interface Errors {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?:string;
}

// validate username

export const usernameValidate = async(values: Values): Promise<Errors>=>{
    const errors = usernameVerify({}, values);

    return errors;
}

function usernameVerify(error:Errors={}, values:Values):Errors{
    if(!values.username){
        error.username = toast.error('Username Required');
    }
    else if(values.username.includes(" ")){
        error.username = toast.error("Invalid username...!")
    }
    return error;
}


// password validate

export const passwordValidate = async(values: Values): Promise<Errors>=>{
    const errors = passwordVerify({}, values);

    return errors;
}

function passwordVerify(error:Errors={}, values:Values):Errors{
    if(!values.password){
        error.password = toast.error('Password Required');
    }
    else if(values.password.includes(" ")){
        error.password = toast.error("wrong password...!")
    }
    return error;
}

// validate Reset Password

interface ResetPassword {
    newPassword: string;
    confirmPassword: string;
  }

  export const resetPasswordValidation = async (values: ResetPassword): Promise<Errors> => {
    const errors: Errors={};
  
    if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword =  toast.error('Passwords do not match');
    }
  
    return errors;
  }


//   validate register form

export const registerValidation = async (values:Values): Promise<Errors> =>{
    const errors = usernameVerify({},values);
    passwordVerify(errors, values);
    emailVerify(errors,values);
    return errors;
}

function emailVerify(error: Errors={},values:Values):Errors {
    const emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!values.email){
        error.email = toast.error("Email Required");
    }
    else if(values.email.includes(" ")){
        error.email = toast.error("Wrong email")
    }
    else if(!emailRegex.test(values.email)){
        error.email = toast.error("Invalid email")
    }
    return error;
}

/** validate profile page */
export async function profileValidation(values:Values): Promise<Errors>{
    const errors = emailVerify({}, values);
    return errors;
}