import { userServiceVariables, URL } from "../Constants/ServiceConstants";
import axios from "axios";

export default class UserService {
    userService(type, data) {
        switch(type) {
            case userServiceVariables.Login:
                return axios.post(`${URL}/users/login`, data);
            case userServiceVariables.Signup:
                return axios.post(`${URL}/users/signup`, data);
            case userServiceVariables.Otp_Verification:
                return axios.post(`${URL}/users/otp`, data);
            case userServiceVariables.Send_Otp:
                return axios.post(`${URL}/users/sendOTP`, data);
            default:
                break;
        }
    }
}