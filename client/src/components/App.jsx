import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

function App() {

const token = useSelector(state => state.application.token)
console.log(token)
if(!token) {
return (
 
    <BrowserRouter>
    <Routes>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path='/signin' element={<SigninPage/>}/>
    <Route path='/' element={<Navigate to ='/signin' replace />}/>
    </Routes>
    </BrowserRouter>   

)
}

  return(

  <BrowserRouter>
  <Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/signup' element={<SignupPage/>}/>
  <Route path='/signin' element={<Navigate to='/' replace/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App;
