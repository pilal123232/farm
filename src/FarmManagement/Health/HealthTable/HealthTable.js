import React, { useEffect, useReducer } from "react";
import './HealthTable.css'
import { DataGrid , arSD} from '@mui/x-data-grid';
import axios from 'axios'
import { HealthDataReducer, INITIAL_STATE } from "./HealthDataReducer";
import Error from "../../../Status/Error";
import Loading from "../../../Status/Loading";
import Table from "../../../Table/Table";

const URl = 'http://localhost:3003/farm/animals/'
const HealthTable = () =>{
   const url = "http://localhost:4000/Health"

   const [state, dispatch] = useReducer(HealthDataReducer,INITIAL_STATE);

   const getdata = async (cancelToken)=> {
      axios.get(url,{cancelToken:cancelToken.token})
      .then((res) =>{
         dispatch({type :"FETCH_SUCCESS", payload:res.data})
      }).catch((err) =>{
         if(axios.isCancel(err)){
            console.log(`cancelled ${err}`)
         }else{
            dispatch({type :"FETCH_ERROR"})
         }
      })
   }
   
   useEffect(()=>{
      console.log('effect')
      dispatch({type :"FETCH_START"})
      const cancelToken = axios.CancelToken.source()

      getdata(cancelToken)

      return ()=>{
         cancelToken.cancel()
      }
   },[])
   const rows = state.HealthData?.map(
      (row) => ({ 
         id: row.id, 
         age: row.age, 
         gender: row.gender, 
         disease: row.disease ,
         treatment: row.treatment ,
         date: row.date}))

   const handleDelete = (id) =>{
      console.log(id)
      dispatch({type :"DELETE", payload:rows.filter(item=>item.id !== id)})
   }

   const actionColumn = [{
      field: 'action',
      headerName: 'حذف/تعديل',
      width: 200,
      sortable: false,
      renderCell : (params) =>{
         return(
            <div className="cellAction">
               <div className="editButton">تعديل</div>
               <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>حذف</div>
            </div>
         )
      }
   }]

   const columns = [
      { field: 'id', headerName: 'رقم البقرة', flex: 2 , headerAlign : 'center' , align : 'center'},
      { field: 'gender', headerName: 'الجنس', flex: 2 , headerAlign : 'center' , align : 'center'},
      { field: 'age', headerName: 'العمر', flex: 2 , headerAlign : 'center' , align : 'center'},
      {
         field: 'disease',
         headerName: 'المرض',
         flex: 2 , headerAlign : 'center' , align : 'center'
      },
      {
         field: 'treatment',
         headerName: 'العلاج',
         sortable: false,
         flex: 2 , headerAlign : 'center' , align : 'center'
      },
      {
         field: 'date',
         headerName: 'التاريخ',
         flex: 2 , headerAlign : 'center' , align : 'center'
      }
   ]; 
   
   return(
      <React.Fragment>
         {state.loading?<Loading/>
         :state.HealthData && rows && <div className="HealthTable shadow">
            <Table 
               rows={rows} 
               columns={columns} 
               setIsUpdate={{}}
               isUpdate={{}}
               URl={URl}
               dispatch={dispatch}/>
         </div>}
         {state.error && <Error/>}
      </React.Fragment>
      /* {<div className="HealthTable shadow">
         {state.loading?<h1>"wait...."</h1>:
         <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
            showColumnVerticalBorder
            showCellVerticalBorder
            checkboxSelection
            autoPageSize
            localeText={
               {
                  ...arSD.components.MuiDataGrid.defaultProps.localeText,
                  MuiTablePagination: {
                     labelDisplayedRows: ({ from, to, count }) =>
                     `${from} - ${to} of ${count}`,
                  },
               }
            }
            />}}
            {state.error && "somthing went worng"}
      </div> */
   )
}

export default HealthTable
