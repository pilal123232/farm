import React from 'react'
import './formInput.css'

const FormInput = (props) => {
   const {id, type ,label , onChange ,pattern , errorMessage ,...inputProps} = props

   let inputElement = null;

   inputElement = type === 'text' || type === 'date'?(
      <div className='row py-2 my-2'>
         <label className="col-sm-3 col-form-label" htmlFor={id}>{label}</label>
         <div className="col-sm-6">
            <input type = {type} id ={id} {...inputProps} onChange={onChange} className='form-control text-start bg-light'/>
         </div>
      </div>):(
         <div className='form-check form-check-inline'>
            <label className="form-check-label" htmlFor={id}><bdi>{label}</bdi></label>
            <input className="form-check-input" type = {type} id ={id} {...inputProps} onChange={onChange} />
         </div>
      );
      
   return (
      inputElement
   )
}

export default FormInput