import React, { useState } from 'react'
import { DataGrid , GridRowModes , arSD  } from '@mui/x-data-grid';
import deleteData from '../Axios/deleteData';
import updataData from '../Axios/updateData';
import { toast } from 'react-toastify';

const Table = (props) => {
   const [rowModesModel, setRowModesModel] = useState({});

   const handleDeleteClick = (id) => { deleteData (props.URl , id , props.dispatch , props.rows); props.setIsUpdate(!props.isUpdate)}

   const handleEditClick = (id) => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   }

   const handleCancelClick = (id) => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
   }

   const handleSaveClick = (id) => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
   };

   const actionColumn = [{
      field: 'action',
      headerName: 'حذف/تعديل',
      flex: 5,
      headerAlign : 'center' , 
      align : 'center',
      disableColumnMenu : true,
      filterable : false,
      sortable: false,
      renderCell : (params) =>{
         const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;
         if(isInEditMode){
            return(
               <div className="cellAction">
                  <div className="cancelButton" onClick={() => handleCancelClick(params.row.id)}>إلغاء</div>
                  <div className="saveButton" onClick={() => handleSaveClick(params.row.id)}>حفظ</div>
               </div>
            )}
            return(
               <div className="cellAction">
                  <div className="deleteButton" onClick={()=> handleDeleteClick(params.row.id)}>حذف</div>
                  <div className="editButton" onClick={() => handleEditClick(params.row.id)}>تعديل</div>
               </div>
            )
      }
   }]

   const processRowUpdate = async (newRow ) => {

      const updatedRow = await updataData(props.URl , newRow , props.dispatch , props.rows)

      props.setIsUpdate(!props.isUpdate)

      return updatedRow;
   }

   const handleProcessRowUpdateError = (e)=>{
      const id = JSON.parse(e.config.data).id;
      toast.error(e.response.data.error,{
         position : toast.POSITION.TOP_CENTER
      })
      handleCancelClick(id)
   }

   return (
      <DataGrid
         rows={props.rows}
         columns={props.columns.concat(actionColumn).reverse()}
         showColumnVerticalBorder
         showCellVerticalBorder
         autoPageSize
         editMode="row"
         rowModesModel={rowModesModel}
         processRowUpdate={processRowUpdate}
         onProcessRowUpdateError={handleProcessRowUpdateError}
         error = {null}
         HorizontalContentAlignment="Center"
         disableColumnSelector
         localeText={
            {
               ...arSD.components.MuiDataGrid.defaultProps.localeText,
               MuiTablePagination: {
                  labelDisplayedRows: ({ from, to, count }) =>
                  `${from} - ${to} of ${count}`,
               },
            }
         }
         slotProps={{
            filterPanel: {
               filterFormProps: {
                  columnsSort : 'asc',
               },
            }
         }}
   />
   )
}

export default Table