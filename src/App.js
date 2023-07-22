import './App.css';
import { BrowserRouter } from 'react-router-dom';
import "../src/library/bootstrap/bootstrap-5.1.3-dist/css/bootstrap.rtl.min.css";
import FarmManagement from './FarmManagement/FarmManagement';
import {ToastContainer} from 'react-toastify'


function App() {
  return (
    <BrowserRouter>
      <FarmManagement/>
      <ToastContainer rtl/>
    </BrowserRouter>
  );
}

export default App;
