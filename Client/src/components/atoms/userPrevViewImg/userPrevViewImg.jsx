import { useSnackbar } from 'notistack';
import{ useState } from 'react'
import SuccessSnackbar from '../../molecules/customsnackbar/successSnackbar';
import ErrorSnackbar from '../../molecules/customsnackbar/errorSnackbar';

function UserPrevViewImg() {
    const [img,setImg] = useState(null)
     const { enqueueSnackbar } = useSnackbar();
        
    const handleUploadImg = (e)=>{

        const file = e.target.files[0]
        if(file && file.type.startsWith("image/")){
            const render = new FileReader()

            render.onload = ()=>{
                    setImg(render.result)
            }
            render.readAsDataURL(file)
        }else{
            
            if(file){
                e.target.value=""
                setImg(null)
                enqueueSnackbar("Please select image file",{
                    variant:"error",
                    content:(key,message)=>(
                        <ErrorSnackbar id={key} message={message} allowDownload={true}/>
                    )
                })

            }
        }
    }

  return {img, handleUploadImg,setImg}
}

export default UserPrevViewImg