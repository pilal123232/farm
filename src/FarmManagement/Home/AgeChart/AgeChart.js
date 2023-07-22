import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AgeChart.css'
import { INITIAL_STATE , NumberAccordingAge } from "./NumberAccordingAgeReducer";

const AgeChart = () =>{
   const url = "http://localhost:4000/NumberAccordingAge"

   const [state, dispatch] = useReducer(NumberAccordingAge,INITIAL_STATE);

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

      getdata(cancelToken)

      return ()=>{
         cancelToken.cancel()
      }
   },[])

   const data = state.NumberAccordingAge
   return(
      <div className="age bg-white shadow">
         <div className="chart">
         {state.loading?"wait....":
            <ResponsiveContainer width="100%" aspect={2/1}>
               <BarChart
                  data={data}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
                  barSize={20}
                  style={{direction: 'rtl'}}
                  >
                  <XAxis axisLine={false} tickLine={false} dataKey="month" reversed={true}  padding={{ left: 10, right: 10 }} />
                  <YAxis axisLine={false} tickLine={false} orientation="right"/>
                  <Tooltip />
                  <Legend iconSize={0} layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{top: -10}}/>
                  <Bar barSize={10} name=" عدد العجول حسب العمر بالشهور" dataKey="number" fill="#242196" background={{ fill: '#eee',radius:10 }} radius={10}/>
               </BarChart>
            </ResponsiveContainer>
         }
         {state.error && "somthing went worng"}
         </div>
      </div>
   )
}

export default AgeChart;