import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend , Sector} from 'recharts';
import './GenderChart.css'
import { Gender , INITIAL_STATE } from "./GenderReducer";

const COLORS = ['#FCBC06', '#5437B4'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
   const x = cx + radius * Math.cos(-midAngle * RADIAN)+10;
   const y = cy + radius * Math.sin(-midAngle * RADIAN)-5;

   return (
   <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
   </text>
   )
}

const renderActiveShape = (props) => {
   const RADIAN = Math.PI / 180;
   const { cx, cy, midAngle,startAngle, endAngle, fill} = props;
   const sin = Math.sin(-RADIAN * midAngle);
   const cos = Math.cos(-RADIAN * midAngle);
   const sx = cx + (10) * cos;
   const sy = cy + (10) * sin;

   return (
      <g>
         <Sector
            cx={sx}
            cy={sy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={0}
            outerRadius={100}
            fill={fill}
         />
      </g>
   );
};

const GenderChart = () => {
   const url = "http://localhost:4000/GenderNumber"

   const [state, dispatch] = useReducer(Gender,INITIAL_STATE);

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

   const GenderNumber = state.GenderNumber

   return(
      <div className="GenderChart bg-white shadow d-flex justify-content-between flex-wrap">
         <div className="d-flex justify-content-center">
            <bdi>
               تصنيف العجول
            </bdi>
            {state.loading?"wait....":
               <ResponsiveContainer 
                  width="100%" 
                  height="100%"
                  minWidth='300px'
                  minHeight='225px'
                  >
                  <PieChart width={600} height={600}>
                     <Pie
                        data={GenderNumber}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="number"
                        startAngle={0}
                        endAngle={360}
                        name="gender"
                        activeIndex={0}
                        activeShape={renderActiveShape}
                     >
                        <Cell key={`cell-0`} fill={COLORS[0]} />
                        <Cell key={`cell-1`} fill={COLORS[1]} />
                     </Pie>
                     <Legend iconType='square' layout="vertical" verticalAlign="bottom" align="right" />                  
                  </PieChart>
               </ResponsiveContainer>}
               {state.error && "somthing went worng"}
            </div>
      </div>
   )
}

export default GenderChart;