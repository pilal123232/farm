import axios from 'axios'
import React, { useState } from 'react'
import {toast} from 'react-toastify'
import FormInput from '../../../formInput/FormInput'

const CowForm=(props) => {
   const url = "http://localhost:3003/farm/animals/add"

   const handle = (e) => {
      const newCow = {...Cow}
      newCow[e.target.id] = e.target.value
      setCow(newCow)
   }

   const handleRadio = (e) => {
      const newCow = {...Cow}
      newCow.Gender = e.target.value
      setCow(newCow)
   }

   const inputs = [
      {
         id : "CowId",
         name : "CowId",
         type : "text",
         label : "رقم البقرة",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle,
      },
      {
         id : "FatherId",
         name : "FatherId",
         type : "text",
         label : "رقم الأب",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         id : "MotherId",
         name : "MotherId",
         type : "text",
         label : "رقم الأم",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         id : "BirthDate",
         name : "BirthDate",
         type : "date",
         label : "تاريخ الميلاد",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         id : "Status",
         name : "Status",
         type : "text",
         label : "الحالة ",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         id : "Weight",
         name : "Weight",
         type : "text",
         label : "الوزن ",
         errorMessage : "",
         pattern : "",
         required : true,
         onChange : handle
      },
      {
         name : 'Gender',
         type : 'radio',
         value : "male" ,
         label : "ذكر ",
         id : "Gender1",
         onChange : handleRadio
      },
      {
         name : 'Gender',
         type : 'radio',
         value : "female" ,
         label : "أنثى",
         id : "Gender2",
         onChange : handleRadio
      }
   ]

   const [Cow, setCow] = useState({
      CowId : "",
      FatherId : "",
      MotherId : "",
      BirthDate : "",
      Gender : "",
      Status : "",
      Weight : ""
   })

   
   const data ={
      id : Cow.CowId,
      FatherId : Cow.FatherId,
      MotherId : Cow.MotherId,
      BirthDate : Cow.BirthDate,
      Gender : Cow.Gender,
      Status : Cow.Status,
      Weight : Cow.Weight
   }

   const submit = (e) => {
      e.preventDefault();

      console.log(data)

      axios.post(url, data,{
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'authorization': `Bearer ${localStorage.getItem('token')}`}})
            .then(res =>{
                  toast.success('تم الإضافة بنجاح ' ,{
                     position : toast.POSITION.TOP_CENTER
                  })
                  props.setIsAddRow(!props.isAddRow)
                  props.setNewRow(data)
               
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
      <div className="bg-white col-xl-5 col-lg-5 col-8 mb-2 mx-auto p-2 shadow">
         <form onSubmit={(e) => submit(e)} className="text-center">
            <legend className="m-1"><bdi>إضافة أبقار جديدة</bdi>  </legend>
               {
                  inputs.map((input) => (
                        <FormInput key={input.id} {...input} onChange={input.onChange}/>))
               }
            <div className='mt-3'>
               <button type="submit" className="btn btn-primary col-3 mb-3"><bdi>تأكيد</bdi></button>
            </div>
         </form>
      </div>
   )
}

export default CowForm