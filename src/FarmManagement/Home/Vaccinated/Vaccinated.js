import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './Vaccinated.css'

const bar = [
   { name: 'جاهزة للإلقاح', value: 500 },
   { name: 'ملقحة', value: 300 },
];
const COLORS = ['#FCBC06', '#5437B4'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
   <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`}
   </text>
   )
}

const Vaccinated = () => {
   return(
      <div className="vaccinated bg-white shadow d-flex justify-content-between flex-wrap">
         <div className="d-flex justify-content-center">
         <bdi>
            تصنيف الأبقار
         </bdi>
               <ResponsiveContainer 
                  width="100%" 
                  height="100%"
                  minWidth='330px'
                  minHeight='250px'>
                  <PieChart width={600} height={600}>
                     <Pie
                        data={bar}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                     >
                        <Cell key={`cell-0`} fill={COLORS[0]} />
                        <Cell key={`cell-1`} fill={COLORS[1]} />
                     </Pie>
                     <Legend iconType='square' layout="vertical" verticalAlign="bottom" align="right" />                  
                  </PieChart>
               </ResponsiveContainer>
         </div>
      </div>
   )
}

export default Vaccinated;