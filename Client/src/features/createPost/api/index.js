import Api from "../../../service/axios"

export const postApi = async (data)=>{

    try {
        const res = Api.post("/api/posts/create",data)
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Create post failed");
    }
}