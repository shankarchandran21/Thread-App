import Api from "../../../../service/axios"

export const followUnFollowApi = async(id)=>{
    try {
        const res = await Api.post(`/api/users/follow/${id}`)
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Login failed");
    }
}