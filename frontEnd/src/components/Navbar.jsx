import { NavLink, useLocation} from 'react-router-dom'
import Register from './../pages/Register';
import { useContext } from 'react';
import { isLoggedInContext } from './../Wapper';

const Navbar = () => {

    const location = useLocation()
    const [logInStatus] = useContext(isLoggedInContext)

    
  return (
    <div className='sticky top-0 z-10 w-full h-[6vh] p-2 flex flex-row justify-end items-center text-amber-300'>
      <div className="w-1/2 m-20">
        <p className='w-fit text-2xl font-bold'>Image Caption AI</p>
      </div>
      {(location.pathname==="/" && !logInStatus) ?  <NavLink to={"/register"}
       className="py-0.7 px-3 bg-white mt-1 rounded-xl text-[1rem] active:scale-90 text-black">Register</NavLink>:""
    }

    {(location.pathname==="/register") ? <NavLink to={"/login"}
       className="py-0.7 px-3 bg-white mt-1 rounded-xl text-[1rem] active:scale-90 text-black">Login</NavLink>:""
    }

    {(location.pathname==="/login") ? <NavLink to={"/register"}
       className="py-0.7 px-3 bg-white mt-1 rounded-xl text-[1rem] active:scale-90 text-black">Register</NavLink>:""
    }
     
    </div>
  )
}

export default Navbar 
