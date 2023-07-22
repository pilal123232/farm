import axios from 'axios'
import React, { useState } from 'react'

const MedicalCondition = () => {
   const url = "http://localhost:4000/MedicalCondition"

   const [MedicalCondition, setMedicalCondition] = useState({
      id : "",
      disease : "",
      treatment : "",
      MedicalDate : ""
   })

   const handle = (e) => {
      const newMedicalCondition = {...MedicalCondition}
      newMedicalCondition[e.target.id] = e.target.value
      setMedicalCondition(newMedicalCondition)
   }

   const submit = (e) => {
      e.preventDefault();
      axios.post(url ,{
         id : MedicalCondition.id,
         disease : MedicalCondition.disease,
         treatment : MedicalCondition.treatment,
         date : MedicalCondition.MedicalDate
      }).then(res =>{
         console.log(res.data)
      })
   }
   return (
      <div className="bg-white col-xl-5 col-lg-5 col-8 mx-auto my-lg-0 p-2 shadow">
         <form onSubmit={(e) => submit(e)} className="text-center">
            <legend className="m-2"><bdi>إضافة حالة مرضية</bdi>  </legend>
            <div className="row pt-3 pb-1 my-1">
               <label htmlFor="id" className="col-sm-3 col-form-label"><span><bdi> رقم البقرة</bdi> </span></label>
               <div className="col-sm-6">
                  <input onChange={(e)=> handle(e)} value={MedicalCondition.id} id="id" type="text" className="form-control text-start bg-light"/>
               </div>
            </div>

            <div className="row py-1 my-1">
               <label htmlFor="disease" className="col-sm-3 col-form-label"><bdi> المرض </bdi> </label>
               <div className="col-sm-6">
                  <input onChange={(e)=> handle(e)} value={MedicalCondition.disease} id="disease" type="text" className="form-control text-start bg-light"/>
               </div>
            </div>

            <div className="row py-1 my-1">
               <label htmlFor="treatment" className="col-sm-3 col-form-label"><bdi> العلاج</bdi> </label>
               <div className="col-sm-6">
                  <input onChange={(e)=> handle(e)} value={MedicalCondition.treatment} id="treatment" type="text" className="form-control text-start bg-light"/>
               </div>
            </div>

            <div className="row mb-3">
            <label htmlFor="MedicalDate" className="col-sm-3 col-form-label"><bdi> التاريخ</bdi> </label>
               <div className="col-sm-6">
                  <input onChange={(e)=> handle(e)} value={MedicalCondition.MedicalDate} id="MedicalDate" type="date" className="form-control text-start bg-light"/>
               </div>
            </div>
            <button type="submit" className="btn btn-primary col-3 mb-3"><bdi>تأكيد</bdi></button>
         </form>
      </div>
   )
}

export default MedicalCondition