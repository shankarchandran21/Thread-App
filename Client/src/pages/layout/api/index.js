import Api from "../../../service/axios"

export const logoutApi = async ()=>{
    try {
        const res = await Api.post("/api/users/logout")
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Logout failed");
    }
}