import Api from "../../../service/axios";

export const updateProfileApi = async (data)=>{
    
    try {
        const res = await Api.put(`/api/users/update/${data._id}`,data,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
        return res
    } catch (err) {
        throw new Error(err.response?.data?.message || "Failed to update user");
    }
    
}

