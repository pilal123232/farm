import React, { useEffect, useReducer, useState } from "react";
import './InseminationTable.css'
import axios from 'axios'
import { InseminationDataReducer, INITIAL_STATE } from "./InseminationDataReducer";
import getdata from "../../../Axios/getData";
import Loading from "../../../Status/Loading";
import Error from "../../../Status/Error";
import Table from "../../../Table/Table";

const URl = 'http://localhost:3003/farm/Insemination/'

const InseminationTable = (props) =>{

   const [skipCount , setSkipCount] = useState(true);

   const [state, dispatch] = useReducer(InseminationDataReducer,INITIAL_STATE);
   
   useEffect(()=>{
      dispatch({type :"FETCH_START"})
      const cancelToken = axios.CancelToken.source()

      getdata(URl , cancelToken , dispatch)

      return ()=>{
         cancelToken.cancel()
      }
   },[])

   const updatedata = async (URl , cancelToken , dispatch)=> {
      await axios.get(`${URl}/all`,{cancelToken:cancelToken.token})
      .then((res) =>{
         dispatch({type :"UPDATE", payload:res.data.data})
      }).catch((err) =>{
         if(axios.isCancel(err)){
            console.log(`cancelled ${err}`)
         }else{
            dispatch({type :"FETCH_ERROR"})
         }
      })
   }

   useEffect(()=>{
      const cancelToken = axios.CancelToken.source()

      updatedata(URl , cancelToken , dispatch)

      return ()=>{
         cancelToken.cancel()
      }
   },[props.isUpdate])

   useEffect(()=>{
      if(skipCount){
         setSkipCount(false)
         return
      }
      else{
         const data = [...state.InseminationData , props.newRow]
         dispatch({type :"UPDATE", payload:data})
         return
      }
   },[props.isAddRow])

   const rows = state.InseminationData?.map(
      (row) => ({ 
         id : row.id,
         animalId: row.animalId, 
         InseminatedBullId: row.InseminatedBullId, 
         InseminationType: row.InseminationType, 
         InseminationDate:  new Date(row.InseminationDate)
      }))

   const columns = [
      { field: 'animalId', headerName: 'رقم البقرة', flex: 2 , headerAlign : 'center' , align : 'center' , editable : true},
      { field: 'InseminatedBullId', headerName: 'رقم الثور', flex: 2 , headerAlign : 'center' , align : 'center' , editable : true},
      { field: 'InseminationType', headerName: 'نوع التلقيح', flex: 2 , headerAlign : 'center' , align : 'center' , editable : true},
      {
         field: 'InseminationDate',
         headerName: 'مضى على التلقيح',
         flex: 3 , 
         headerAlign : 'center' , 
         align : 'center' ,
         renderCell : (params) => {const day =(Math.ceil((new Date().getTime() - params.value ) / ( 1000 * 60 * 60 * 24))); return <div> <bdi style={{margin : '0 5px'}}> يوم </bdi>  {day} </div>  ;}
      }
   ]; 

   return(
      <React.Fragment>
         {state.loading?(<Loading/>)
         :state.InseminationData && rows && <div className="InseminationTable shadow  col-sm-5"> 
            <Table
               rows={rows} 
               columns={columns} 
               setIsUpdate={props.setIsUpdate}
               isUpdate={props.isUpdate}
               URl={URl} 
               dispatch={dispatch}/>
         </div>}
         {state.error && (<Error/>)}
      </React.Fragment>
   )
}

export default InseminationTable
