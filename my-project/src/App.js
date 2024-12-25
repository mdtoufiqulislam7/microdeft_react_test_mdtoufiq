
import './App.css';
import LoginPage from './component/Login';
import Navbar from './component/Navbar';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import RegistrationPage from './component/Registation';
import CourseCard from './component/Course';

function App() {

  const token =  localStorage.getItem('token')
  return (
   <>
   <Router>
   <Navbar/>
   <Routes>

    {
       token!==null?(
      <>
      <Route exact path='/' element={<CourseCard/>} />
      <Route exact path='/course' element={<CourseCard/>} />  
      <Route exact path='/login' element={<CourseCard/>} />
      <Route exact path='/registation' element={<CourseCard/>} />

      </>):(
      <>
       
      <Route exact path='/login' element={<LoginPage/>} />
      <Route exact path='/registation' element={<RegistrationPage/>} />
      <Route exact path='/' element={<LoginPage/>} />
      <Route exact path='/course' element={<LoginPage/>} />
      
      
      </>)
    }


    
    
   </Routes>
   </Router>
   </>
  );
}

export default App;
