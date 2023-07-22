import axios from "axios"
import { toast } from "react-toastify";

const updataData = async ( URl , newRow , dispatch , rows) =>{ 
   const data = rows.map((row) => (row.id === newRow.id ? newRow : row))

   const update = await axios.put(`${URl}/update/${newRow.id}`, newRow)
      .then((res) => {
         console.log(res)
         if (res.status === 200){
            toast.success('تم التعديل بنجاح ' ,{
               position : toast.POSITION.TOP_CENTER
            })
            dispatch({type :"UPDATE", payload:data});
            return newRow
         }
      })
   return update
}

export default updataData


