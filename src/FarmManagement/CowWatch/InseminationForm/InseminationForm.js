import axios from 'axios'
import React, { useState } from 'react'
import FormInput from '../../../formInput/FormInput'
import { toast } from 'react-toastify'

const InseminationForm = (props) => {
   const url = "http://localhost:3003/farm/Insemination/add"

   const handle = (e) => {
      const newInsemination = {...Insemination}
      newInsemination[e.target.id] = e.target.value
      setInsemination(newInsemination)
   }

   const inputs = [
      {
         id : "animalId",
         name : "animalId",
         type : "text",
         label : "رقم البقرة",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle,
      },
      {
         id : "InseminationType",
         name : "InseminationType",
         type : "text",
         label : "نوع التلقيح",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         id : "InseminatedBullId",
         name : "InseminatedBullId",
         type : "text",
         label : "رقم الثور الملقح",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         id : "InseminationDate",
         name : "InseminationDate",
         type : "date",
         label : "التاريخ",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      }
   ]

   const [Insemination, setInsemination] = useState({
      animalId : "",
      InseminationType : "",
      InseminatedBullId : "",
      InseminationDate : ""
   })

   const data = {
      animalId : Insemination.animalId,
      InseminationType : Insemination.InseminationType,
      InseminatedBullId : Insemination.InseminatedBullId,
      InseminationDate : Insemination.InseminationDate
   }

   const submit = (e) => {
      e.preventDefault();
      axios.post(url , data,{
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'authorization': `Bearer ${localStorage.getItem('token')}`}})
            .then(res =>{
                  toast.success('تم الإضافة بنجاح ' ,{
                     position : toast.POSITION.TOP_CENTER
                  })
                  props.setIsAddRow(!props.isAddRow)
                  props.setNewRow({id:res.data.id , ...data})
            }).catch((error) =>{
               if(error.response){ // 404 401
                  if(error.response.status === 404){
                     console.log("not found")
                  }else if(error.response.status === 400 && error.response.status === 401){
                     console.log("invalid token")
                  }else{
                     toast.error(error.response.data.error,{
                     position : toast.POSITION.TOP_CENTER
                  })}
               }else if(error.request){
                  console.log(error.request , "request error")
               }
               })
   }
   return (
      <div className="bg-white col-xl-5 col-lg-5 col-8 mx-auto my-lg-0 p-2 shadow">
         <form onSubmit={(e) => submit(e)} className="text-center">
            <legend className="m-2"><bdi>إعداد تلقيح جديد</bdi>  </legend>
            {
               inputs.map((input) => (<FormInput key={input.id} {...input} onChange={input.onChange}/>))
            }
            <button type="submit" className="btn btn-primary col-3 mb-3"><bdi>تأكيد</bdi></button>
         </form>
      </div>
   )
}

export default InseminationForm