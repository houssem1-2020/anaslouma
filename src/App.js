//React And GLOBAL CSS
import React, { useEffect, useState } from 'react';
import GConf from './AssetsM/generalConf';
import LoadingBar from 'react-top-loading-bar'
import { toast, ToastContainer } from 'react-toastify';

// /*CSS*/
import 'bootstrap-icons/font/bootstrap-icons.css';
import './theme.css';
import "gridjs/dist/theme/mermaid.css";
import 'react-toastify/dist/ReactToastify.css';

//Router & Routes
import { BrowserRouter as Router,Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import systemRouter from './AssetsM/Router/systemRouter';
import camionRouter from './AssetsM/Router/camionRouter';
import commandeRouter from './AssetsM/Router/commandeRouter';
import PrintingRouter from './AssetsM/Router/printRouter';

//Login 
import LogIn from './LogIn/logIn';


function App() {
  //const and variables 
  const SystemRouter = systemRouter();
  const InputRouter = camionRouter();
  const CommandeRouter = commandeRouter()
  const PrintRouter = PrintingRouter()
  const [progress, setProgress] = useState(2)

  //useefeects
  useEffect(() => {
    setProgress(100);
  }, []);

  //card
  const RedirectingPage = () => {
      const pidIsSet = localStorage.getItem('PID');
      return (<>
          {
              pidIsSet ? <Navigate to='/S/ma'  /> : <Navigate to='/Login'  />
          } 
      </>);
  }
  const NotFound = () =>{
    return (<div className="cpntainer text-danger pt-5 text-center">
            <h1>Page Introuvable 404 </h1>
            <img src='https://system.anaslouma.tn/Assets/images/404.svg' width='200px' className='img-responsive ' />
        </div>);
  }

  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RedirectingPage />} />
          <Route path="Login" element={<LogIn />} />
          {SystemRouter}
          {InputRouter}
          {CommandeRouter}
          {PrintRouter}
          <Route path="*" element={<NotFound />} />
        </Routes>   
      </Router>
      <LoadingBar color={GConf.themeColor} progress={progress}  
                //onLoaderFinished={() => setProgress(0)} 
      />
      <ToastContainer />
    </>
    
  );
}

export default App;
