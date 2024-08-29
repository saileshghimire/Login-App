import { toast } from "react-hot-toast";

// validate username

interface Values {
    Username: string;
  }
  
  // Define the type for the error object
  interface Errors {
    Username?: string;
  }

export const usernameValidate = async(values: Values): Promise<Errors>=>{
    const errors = usernameVerify({}, values);

    return errors;
}

function usernameVerify(error:Errors={}, values:Values):Errors{
    if(!values.Username){
        error.Username = toast.error('Username Required');
    }
    else if(values.Username.includes(" ")){
        error.Username = toast.error("Invalid username...!")
    }
    return error;
}