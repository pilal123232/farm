import React , {Component} from "react";
import { Route, Routes} from "react-router";
import Sidebar from "./Sidebar/Sidebar"
import Navbar from "./Navbar/Navbar"
import Health from "./Health/Health"
import Home from "./Home/Home";
import CowWatch from "./CowWatch/CowWatch";

class FarmManagement extends Component {
   render(){
      return(
         <React.Fragment>
                  <Sidebar/>
               <main className="col-11 col-sm-10">
                  <Navbar/>
                  <Routes>
                     <Route path="/" exact element={<Home/>}/>
                     <Route path="/health" exact element={<Health/>}/>
                     <Route path="/milk" exact element={<p>milk</p>}/>
                     <Route path="/checking" exact element={<CowWatch/>}/>
                  </Routes>
               </main>
         </React.Fragment>
      )
   }
}

export default FarmManagement;