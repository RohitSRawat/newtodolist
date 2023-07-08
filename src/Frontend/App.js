import { Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Loginpage from "./components/loginpage";
import {SkeletonTheme} from 'react-loading-skeleton'

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" exact  element={ <Homepage  />} />
        <Route path="/login" element={ <Loginpage /> } />
      </Routes>
      
     
    </div>
  );
}

export default App;
