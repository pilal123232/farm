import React, { useEffect, useReducer, useState } from "react";
import './CowTable.css'
import axios from 'axios'
import { CowDataReducer, INITIAL_STATE } from './CowDataReducer';
import 'react-toastify/dist/ReactToastify.css'
import Auth from '../../../auth'
import getdata from "../../../Axios/getData";
import Loading from "../../../Status/Loading";
import Error from "../../../Status/Error";
import Table from "../../../Table/Table";

// default URL and header to sent in axios
const URl = 'http://localhost:3003/farm/animals/'
axios.defaults.headers = {
   "Accept": "application/json",
   "Content-Type": "application/json",
   'authorization': `Bearer ${localStorage.getItem('token')}`,
}

const CowTable = (props) =>{

   const [skipCount , setSkipCount] = useState(true);

   const [state, dispatch] = useReducer(CowDataReducer,INITIAL_STATE);

   useEffect(()=>{


      const cancelToken = axios.CancelToken.source()

      dispatch({type :"FETCH_START"})
      
      getdata(URl , cancelToken , dispatch)

      return ()=>{
         cancelToken.cancel()
      }
   },[])

   useEffect(()=>{
      if(skipCount){
         setSkipCount(false)
         return
      }
      else{
         const data = [...state.CowData , props.newRow]
         dispatch({type :"UPDATE", payload:data})
         return
      }
   },[props.isAddRow])

   const rows = state.CowData?.map(
      (row) => ({
         ...row,
         BirthDate : new Date(row.BirthDate)
      }))
      

   const columns = [
      { field: 'id', headerName: 'الرقم', flex: 2 , headerAlign : 'center' , align : 'center' , type : 'number'},
      { field: 'FatherId', headerName: 'رقم الأب', flex: 2, headerAlign : 'center' , align : 'center' , type : 'number'},
      { field: 'MotherId', headerName: 'رقم الأم', flex: 2, headerAlign : 'center' , align : 'center' , editable : true , type : 'number'},
      { field: 'Gender', headerName: 'الجنس', flex: 2, headerAlign : 'center' , align : 'center' , editable : true, type : 'singleSelect' , valueOptions : [{value : 'male' , label : 'ذكر'}, {value : 'female' , label : 'أنثى'}] ,renderCell : (params) => {return params.value === "male" ? "ذكر" : "أنثى"}},
      { field: 'Status', headerName: ' الحالة', flex: 3, headerAlign : 'center' , align : 'center' },
      { field: 'Weight', headerName: 'الوزن ', flex: 2, headerAlign : 'center' , align : 'center', editable : true},
      { field: 'BirthDate', headerName: 'العمر', flex: 2, headerAlign : 'center' , align : 'center' , editable : true , type : 'date'  ,renderCell : (params) => {const Age =(Math.ceil((new Date().getTime() - params.value ) / ( 1000 * 60 * 60 * 24 * 30))) ;return ( Age < 12 ? <div> <bdi style={{margin : '0 5px'}}> شهر </bdi>  {Age} </div>  : <div> <bdi style={{margin : '0 5px'}}> سنة </bdi> {Math.floor(Age/12)} </div> )}},
   ]; 

   return(
      <React.Fragment>
         {state.loading?<Loading/>
         :state.CowData && rows && <div className="CowTable shadow col-sm-8 col-lg-5">
            <Table 
               rows={rows} 
               columns={columns} 
               setIsUpdate={props.setIsUpdate}
               isUpdate={props.isUpdate}
               URl={URl}
               dispatch={dispatch}/>
         </div>}
         {state.error && <Error/>}
      </React.Fragment>
   )
}

export default CowTable
