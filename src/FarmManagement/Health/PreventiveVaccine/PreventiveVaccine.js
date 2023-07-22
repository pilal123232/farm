import axios from 'axios'
import React, { useState } from 'react'

const PreventiveVaccine=() => {
   const url = "http://localhost:4000/PreventiveVaccine"

   const [Vaccine, setVaccine] = useState({
      VaccineName : "",
      VaccineDate : ""
   })

   const handle = (e) => {
      const newVaccine = {...Vaccine}
      newVaccine[e.target.id] = e.target.value
      setVaccine(newVaccine)
   }

   const submit = (e) => {
      e.preventDefault();
      axios.post(url ,{
         Name : Vaccine.VaccineName,
         date : Vaccine.VaccineDate
      }).then(res =>{
         console.log(res.data)
      })
   }

   return (
      <div className="bg-white col-xl-5 col-lg-5 col-8 mb-2 mx-auto p-2 shadow">
      <form onSubmit={(e) => submit(e)} className="text-center">
         <legend className="m-1"><bdi>إضافة لقاح وقائي</bdi>  </legend>
         <div className="row py-2 my-2">
            <label htmlFor="VaccineName" className="col-sm-3 col-form-label"><bdi> اسم اللقاح</bdi> </label>
            <div className="col-sm-6">
               <input onChange={(e)=> handle(e)} value={Vaccine.VaccineName} id="VaccineName" type="text" className="form-control text-start bg-light"/>
            </div>
         </div>

         <div className="row mb-3">
         <label htmlFor="VaccineDate" className="col-sm-3 col-form-label"><bdi> التاريخ</bdi> </label>
            <div className="col-sm-6">
               <input onChange={(e)=> handle(e)} value={Vaccine.VaccineDate}  id="VaccineDate" type="date" className="form-control text-start bg-light"/>
            </div>
         </div>
         <button type="submit" className="btn btn-primary col-3 mb-3"><bdi>تأكيد</bdi></button>
      </form>
   </div>
   )
}

export default PreventiveVaccine