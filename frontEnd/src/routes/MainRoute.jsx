import {Route,Routes} from "react-router-dom"
import HomePage from "../pages/HomePage"
import Login from "../pages/Login"
import Register from "../pages/Register"

const MainRoute = () => {
  return (
    
    <div>
        <Routes>
            <Route path='/' element = {<HomePage />} />
            <Route path='/register' element = {<Register />} />
            <Route path='/login' element = {<Login />}/>
        </Routes>
    </div>
  
)
    }

export default MainRoute
