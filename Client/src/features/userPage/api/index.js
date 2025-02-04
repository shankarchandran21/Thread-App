import Api from "../../../service/axios";

export const getProfileApi = async (userName)=>{

    try {
        const res = Api.get(`/api/users/profile/${userName}`)
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Login failed");
    }
}