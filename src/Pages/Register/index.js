
import { readCookie } from "../../utils/cookies";
import Profile from "../../Components/Profile"
import SignUp from "../SignUp";

const Register = () => {
    const user = readCookie("username");
    const email = readCookie("email");
    const accessToken = readCookie("accessToken");


    if (user && email && accessToken){
        return <Profile/>
    } else if (!user && !email && !accessToken)
        return <SignUp />
 
}

export default Register;
