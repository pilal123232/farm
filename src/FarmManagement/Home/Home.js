import React, { useEffect, useReducer } from "react";
import axios from "axios";
import "./Home.css";
import "./Widgets/Widgets";
import Widgets from "./Widgets/Widgets";
import ProductionChart from "./ProductionChart/ProductionChart";
import GenderChart from "./GenderChart/GenderChart";
import AgeChart from "./AgeChart/AgeChart";
import Vaccinated from "./Vaccinated/Vaccinated";
import { HomeData , INITIAL_STATE } from "./HomeDataReducer";

const Home =() => {
   
   const url = `http://localhost:3003/farm/home`

   const [state, dispatch] = useReducer(HomeData,INITIAL_STATE);

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
   
   
   console.log(! state.loading && ! state.error ? state.HomeData?.data.countCow.countAll : "loading" )

      return(
         <div className="Home container-fluid p-4 m-0 bg-light containt">
            <Widgets/>
            <section className="middle d-flex flex-wrap">
               <ProductionChart/>
               <GenderChart/>
            </section>
            <section className="footer d-flex flex-wrap">
               <AgeChart/>
               <Vaccinated/>
            </section>
         </div>
      )
   
}

export default Home;