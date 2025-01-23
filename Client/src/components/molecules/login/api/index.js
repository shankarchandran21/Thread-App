import Api from "../../../../service/axios";

const loginApi = async (data)=>{
    try {
        const res = await Api.post(`/api/users/login`,data)
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Login failed");
    }
}

export const loginPageApi={loginApi}