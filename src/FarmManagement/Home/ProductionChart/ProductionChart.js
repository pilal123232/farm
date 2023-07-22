import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ProductionChart.css'
import { ProductionData , INITIAL_STATE } from "./ProductionReducer";

const ProductionChart = ()=>{
   const url = `http://localhost:3003/farm/home`

   const [state, dispatch] = useReducer(ProductionData,INITIAL_STATE);

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

   const a = [10,12,52,95,10]
   
   const Data = state.ProductionData
   const data1 = [
      {
      name : "number of cows" , 
      value : `${0}`}
       , 
      {name1 : "number of calvs " , 
      value : 10000058} 
   ]

   const Data1 = data1 
   
   return( 
      
      <div className="ProductionChart bg-white shadow">
         <div className="top">test</div>
         <div className="bottom d-flex justify-content-center">
            <div className="chart">
            {state.loading?"wait....":
               <ResponsiveContainer width="100%" aspect={2/1}>
                     <LineChart
                        data={data1}
                        margin={{
                           top: 5,
                           right: 30,
                           left: 20,
                           bottom: 5,
                        }}
                        style={{direction: 'rtl'}}
                     >
                        <CartesianGrid strokeWidth={0.5} stroke="rgba(20,20,20,0.1)"/>
                        <Tooltip />
                        <XAxis tickLine={false} axisLine={false} dataKey="Data1" reversed={true}/>
                        <YAxis tickLine={true} axisLine={true} orientation="right" dx={20}/>
                        <Legend iconType='square' layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{top: -10, left: -25}}/>
                        <Line name=" إنتاج الحليب" type="monotone" dataKey="value" stroke="#29C06D" strokeWidth={4} />
                        <Line name=" إستهلاك الأعلاف" type="monotone" dataKey="value" stroke="#FDAD15" strokeWidth={4} />
                     </LineChart>
               </ResponsiveContainer>}
               {state.error && "somthing went worng"}
            </div>
         </div>
      </div>
   )
}

export default ProductionChart;