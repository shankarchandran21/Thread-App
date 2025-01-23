import axios from "axios"

const RegisterUserApi = async (data)=>{
    try {
        const res = await axios.post(`/api/users/signup`,data)
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to create user");
    }
}

export const SignupPageApi={RegisterUserApi}