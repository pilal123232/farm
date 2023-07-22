import React, { Component } from "react";
import './Health.css';
import HealthTable from "./HealthTable/HealthTable.js";
import PreventiveVaccine from "./PreventiveVaccine/PreventiveVaccine";
import MedicalCondition from "./MedicalCondition/MedicalCondition";

class Health extends Component{
   render(){
      return(
         <div className="Health container-fluid p-4 m-0 bg-light containt">
            <section className="mb-4 row justify-content-between">
               <PreventiveVaccine/>
               <MedicalCondition/>
            </section>
            <section className="d-flex justify-content-center">
               <HealthTable/>
            </section>
         </div>
      )
   }
}

export default Health;
