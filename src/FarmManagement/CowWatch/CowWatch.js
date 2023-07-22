import React, { useState } from "react";
import './CowWatch.css';
import CowForm from "./CowForm/CowForm";
import InseminationForm from "./InseminationForm/InseminationForm";
import CowTable from "./CowTable/CowTable";
import InseminationTable from "./InseminationTable/InseminationTable"

const CowWatch = () =>{
   const [isAddCow,setIsAddCow] = useState(true)
   const [isUpdate , setIsUpdate] = useState(true)

   const [newRow, setNewRow] = useState({})
   const [isAddInsemination , setIsAddInsemination] = useState(true)

   return(
      <div className="Watch container-fluid p-4 m-0 bg-light containt">
         <section className="mb-4 row justify-content-between">
            <CowForm isAddRow={isAddCow} setIsAddRow={setIsAddCow} setNewRow={setNewRow}/>
            <InseminationForm isAddRow={isAddInsemination} setIsAddRow={setIsAddInsemination} setNewRow={setNewRow}/>
         </section>
         <section className="d-flex justify-content-between footer flex-wrap">
            <CowTable isUpdate={isUpdate} setIsUpdate={setIsUpdate} isAddRow={isAddCow} setIsAddRow={setIsAddCow} newRow={newRow}/>
            <InseminationTable isUpdate={isUpdate} setIsUpdate={setIsUpdate} isAddRow={isAddInsemination} newRow={newRow}/>
         </section>
      </div>
   )
}

export default CowWatch;
