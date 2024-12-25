import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux_toolkit/auth_slice";

function Navbar() {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutbutton = ()=>{
        dispatch(logout());
        navigate('/login')
        window.location.reload();
      }





  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          <div className="text-white text-2xl font-bold">
            <a href="/">Micro Draft</a>
          </div>

         
          <div className="flex items-center space-x-6">

           {
            token !==null?(<> <div>  
                
                <a
                href="/course"
                className="text-gray-300 hover:text-white px-4 py-2 rounded transition duration-300"
              >
                Course
              </a>
              <a
              href="/login"
              onClick={logoutbutton}
              className="text-gray-300 hover:text-white px-4 py-2 rounded transition duration-300"
            >
              Logout
            </a>
              </div>

             </>):(<>
              <div> 
             <a
              href="/login"
              className="text-gray-300 hover:text-white px-4 py-2 rounded transition duration-300"
            >
              Login
            </a>
            <a
              href="/registation"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Registration
            </a> 
            </div> 
            </>)
           }


            
           
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
