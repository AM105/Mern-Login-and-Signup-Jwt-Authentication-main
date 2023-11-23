
import Home from "./component/Home"
import Login from "./component/Login"
import Signup from "./component/Signup"
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>welcome</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>   
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;