import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home"
import{BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children})=>{
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
      <ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="login" element={<Login/>}> </Route>
      <Route path="register" element={<Register/>}> </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
