import React , {useEffect , useReducer , useState} from "react";
import './Widgets.css'
import Cowface from "./icons/cowFace";
import Milk from "./icons/milk";
import Cow from "./icons/cow";
import CowSpots from "./icons/cowSpots";
import axios from "axios";
import { WidgetsData , INITIAL_STATE } from "./WidgetsDataReducer";
const WidgetItem = [
   {
      name : "عدد الأبقار",
      icon : <Cowface/>,
      number : 1,
      color : "--navy-blue-color"
   },
   {
      name : "الأبقار الحلوب",
      icon : <Milk/>,
      number : 1,
      color : "--green-color"
   },
   {
      name : "الأبقار الجافة",
      icon : <Cow/>,
      number : 1,
      color : "--blue-color"
   },
   {
      name : "الأبقار الحوامل",
      icon : <CowSpots/>,
      number : 1,
      color : "--yellow-color"
   }
]

const Widget = (props) => {
   const url = "http://localhost:3003/farm/home"

   const [state, dispatch] = useReducer(WidgetsData,INITIAL_STATE);

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
      dispatch({type :"FETCH_START"})
      const cancelToken = axios.CancelToken.source()

      getdata(url,cancelToken,dispatch)

      return ()=>{
         cancelToken.cancel()
      }
   },[])


   return(
      <div className="Widget d-flex justify-content-between bg-white shadow" style={{borderRight :`4px solid var(${props.color})`}}>
         <div className="righ d-flex flex-column">
            <p style={{ color: `var(${props.color})`}}>
               {props.name}
            </p>
            <p>
               {props.number}
            </p>
         </div>
         <div className="left d-flex align-items-center">
            {props.icon}
         </div>
      </div>
   )
}

const Widgets = () =>{
   return(
      <section className="Widgets d-flex flex-wrap">     
         {
            WidgetItem.map((item , index)=>(
               <Widget 
               key={index}
               name={item.name} 
               icon={item.icon} 
               number={item.number} 
               color={item.color}/>)
               )
         }
      </section>
   )
}

export default Widgets;