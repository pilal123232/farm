import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {

   const style = {
      width: '43%',
      background: 'white',
      border: '1px solid black',
      borderRadius: '8px' ,
      height: '400px'
   }

   return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={style}>
         <h1 className="d-flex justify-content-center"><bdi>الرجاء الانتظار</bdi></h1>
         <svg height="0">
            <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
               <stop offset="20%" stopColor="#39F" />
               <stop offset="90%" stopColor="#F3F" />
            </linearGradient>
         </svg>
         <CircularProgress className="d-flex justify-content-center align-items-center" size={200} sx={{'svg circle': { stroke: 'url(#linearColors)' } }}/>
      </div>
   )
}

export default Loading