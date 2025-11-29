import {useForm} from "react-hook-form"
import axios from "../utils/Axios"
import { useNavigate,NavLink } from "react-router-dom"
import { toast } from 'react-toastify';
import { useContext } from "react";
import { isLoggedInContext } from "../Wapper";

const Login = () => {

      const { register, handleSubmit, formState: {errors},reset } = useForm()
      const navigate = useNavigate()
      const [logInStatus, setLogInStatus] = useContext(isLoggedInContext)
        
      async function formHandler(data){
       
        try{

             const response = await axios.post("/auth/login",{
            "username": data.username,
            "password":data.password
        })

        if(response.status==200){
            console.log("login successfully");
            navigate("/")
            setLogInStatus(true)
            toast.success("Login Succesfull")
            
        }

        }catch(err){
            console.log(err);
            reset()
            toast.error("Wrong email or password try Again")
        } 

      }

  return (
    <div className='w-full h-[95vh] flex justify-center items-center'>

    <div className="registerBox w-1/3 h-fit box-border pb-6
       bg-transparent border border-gray-300 
       rounded-2xl shadow-lg p-2
       flex flex-col items-center gap-3">
  
        <h2 
        className='text-2xl text-white font-semibold'>Login</h2>

        <form onSubmit={handleSubmit(formHandler)}
        className='flex flex-col items-start justify-start w-full text-white px-4 mt-4 gap-3'>

            <p className="text-lg">Enter Email</p>
            <input type="email" 
            {...register("username" ,{required:true})}
            placeholder="abc@example.com"
            className="w-1/2 px-1 py-0.5 border-2 border-white rounded-xs outline-0 text-lg"/>
            {errors.username && <p className="text-red-500 text-xs">Please enter username</p>}

             <p className="text-lg">Enter Password</p>
            <input type="password" 
            {...register("password" , {required:true})}
            placeholder="********"
            className="w-1/2 px-1 py-0.5 border-2 border-white rounded-xs outline-0 text-lg 
            placeholder:text-start"/>

            {errors.password && <p className="text-red-500 text-xs">Please enter password</p>}

            <button onClick={()=>{handleSubmit()}}
            className="text-xs px-2 py-0.5 bg-blue-600 rounded-lg active:scale-95">Submit</button>

            <p className="
            self-center text-white text-xs">Don't have an accout? <NavLink to={"/register"} className="text-blue-400">Register</NavLink> here</p>

        </form>



  </div>




    </div>
  )
}

export default Login
