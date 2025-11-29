import React, { useContext, useState } from 'react'
import { isLoggedInContext } from './../Wapper';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "../utils/Axios"

const HomePage = () => {

  const [logInStatus] = useContext(isLoggedInContext)
  const [data, setData] = useState([]) // stores image and caption collectively

  const { register, handleSubmit } = useForm()

  async function formHandler(formDataObj) {
    try {
      const file = formDataObj.image[0]

      setData(prev => [...prev, { image: file, caption: null }])

      const formData = new FormData()
      formData.append("image", file)
      const response = await axios.post("/posts/", formData)

      setData(prev =>
        prev.map(item =>
          !item.caption ? { ...item, caption: response.data.post.caption } : item
        )
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-full relative text-white flex flex-col gap-3 justify-between items-center z-5'>

      <div className="contentParent h-[88vh] w-[85%] flex flex-col mt-3 overflow-y-auto">
        
        {data && data.length > 0 ? (
          data.map((post, index) => (
            <React.Fragment key={index}>
              <img
                className='relative w-1/2 h-[45vh] object-cover self-end'
                src={URL.createObjectURL(post.image)}
                alt=""
              />
              {post.caption ?
                <p className='w-[35%] p-2 bg-yellow-400 rounded-lg self-start'>
                  {post.caption}
                </p>
              :
              (<svg 
              className='w-[60px] h-[50px] animate-spin'
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(23,235,208,0.26)"><path d="M11.9995 2C12.5518 2 12.9995 2.44772 12.9995 3V6C12.9995 6.55228 12.5518 7 11.9995 7C11.4472 7 10.9995 6.55228 10.9995 6V3C10.9995 2.44772 11.4472 2 11.9995 2ZM11.9995 17C12.5518 17 12.9995 17.4477 12.9995 18V21C12.9995 21.5523 12.5518 22 11.9995 22C11.4472 22 10.9995 21.5523 10.9995 21V18C10.9995 17.4477 11.4472 17 11.9995 17ZM20.6597 7C20.9359 7.47829 20.772 8.08988 20.2937 8.36602L17.6956 9.86602C17.2173 10.1422 16.6057 9.97829 16.3296 9.5C16.0535 9.02171 16.2173 8.41012 16.6956 8.13398L19.2937 6.63397C19.772 6.35783 20.3836 6.52171 20.6597 7ZM7.66935 14.5C7.94549 14.9783 7.78161 15.5899 7.30332 15.866L4.70525 17.366C4.22695 17.6422 3.61536 17.4783 3.33922 17C3.06308 16.5217 3.22695 15.9101 3.70525 15.634L6.30332 14.134C6.78161 13.8578 7.3932 14.0217 7.66935 14.5ZM20.6597 17C20.3836 17.4783 19.772 17.6422 19.2937 17.366L16.6956 15.866C16.2173 15.5899 16.0535 14.9783 16.3296 14.5C16.6057 14.0217 17.2173 13.8578 17.6956 14.134L20.2937 15.634C20.772 15.9101 20.9359 16.5217 20.6597 17ZM7.66935 9.5C7.3932 9.97829 6.78161 10.1422 6.30332 9.86602L3.70525 8.36602C3.22695 8.08988 3.06308 7.47829 3.33922 7C3.61536 6.52171 4.22695 6.35783 4.70525 6.63397L7.30332 8.13398C7.78161 8.41012 7.94549 9.02171 7.66935 9.5Z"></path></svg>)}
            </React.Fragment>
          ))
        ) : ""}
      </div>

      <form
        onSubmit={handleSubmit(formHandler)}
        className="z-23 w-1/5 h-[5vh] gap-3 rounded-2xl select-none flex items-center justify-center"
      >
        {logInStatus ? (
          <>
            <label className='h-full w-full flex active:scale-95 p-2 rounded-lg bg-gray-600 flex-row gap-2 items-center justify-center cursor-pointer'>
              <svg
                className='h-full'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 7L16 2H3.9934C3.44495 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.556 21 21.0082V7ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM17.5 17H8L13.5 10L17.5 17Z"></path>
              </svg>

              <p>Upload the image</p>
              <input
                {...register("image", { required: true })}
                type="file"
                accept='image/*'
                className='hidden'
              />
            </label>

            <button
              className='h-full p-1 outline-0 w-1/4 bg-blue-600 text-xs active:scale-80 rounded-lg hover:cursor-pointer'
              type="submit"
            >
              Submit
            </button>
          </>
        ) : <>

       <div className='absolute top-0 left-0 h-full w-full flex justify-center items-center'>

            <NavLink
            className="text-2xl active:scale-80 bg-blue-500 py-2 px-4 rounded-lg animate-bounce"
            to={"/login"}>Login to generate captions 🐶</NavLink>

        </div> 
               

        </>}
      </form>

    </div>
  )
}

export default HomePage
