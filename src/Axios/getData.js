import axios from "axios"


const getdata = async (URl , cancelToken , dispatch)=> {
   await axios.get(`${URl}/all`,{cancelToken:cancelToken.token})
   .then((res) =>{
      dispatch({type :"FETCH_SUCCESS", payload:res.data.data})
   }).catch((err) =>{
      if(axios.isCancel(err)){
         console.log(`cancelled ${err}`)
      }else{
         dispatch({type :"FETCH_ERROR"})
      }
   })
}

export default getdata
