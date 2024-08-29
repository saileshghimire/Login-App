import { toast } from "react-hot-toast";


interface Values {
    username?: string;
    password?: string;
}

// Define the type for the error object
interface Errors {
    username?: string;
    password?: string
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