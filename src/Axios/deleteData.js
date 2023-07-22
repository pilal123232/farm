import axios from "axios"
import { toast } from "react-toastify";

const deleteData = async (URl , id , dispatch ,rows) =>{
   await axios.delete(`${URl}/delete/${id}`)
   .then((res) => {
      console.log(res)
      if (res.status === 200){
         toast.success('تم الحذف بنجاح ' ,{
            position : toast.POSITION.TOP_CENTER
         })
         dispatch({type :"UPDATE", payload:rows.filter(item=>item.id !== id)})
      }
   })
   .catch((err) =>{
      toast.error(err.response.data.error ,{
         position : toast.POSITION.TOP_CENTER
      })
   });
}

export default deleteData