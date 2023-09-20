import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home"
import{BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="login" element={<Login/>}> </Route>
        <Route path="register" element={<Register/>}> </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
