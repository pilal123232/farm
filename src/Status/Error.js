import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Error = () => {
   const style = {
      width: '43%',
      background: 'white',
      border: '1px solid black',
      borderRadius: '8px' ,
      height: '400px'
   }

   return (
   <div className="d-flex flex-column justify-content-center align-items-center" style={style}>
      <h1 className="d-flex justify-content-center">
         <bdi>حدث خطأ ما </bdi>
      </h1>
      <FontAwesomeIcon className="d-flex justify-content-center align-items-center" icon={faTriangleExclamation} beat size="10x" style={{color: "#ff0000",}} />
   </div>
   )
}

export default Error