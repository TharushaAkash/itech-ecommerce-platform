
import './App.css'
import HomePage from '../pages/homePage'
import ProductCard from './components/productCard'
import AdminPage from '../pages/adminPage'
import { Routes, Route } from 'react-router-dom'
import TestPage from '../pages/test'
import LoginPage from '../pages/loginPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from '../pages/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPassword from '../pages/forgetPassword'

//156718786153-5sr1gd4j03frqbrqnkk4c1dj6ebttlea.apps.googleusercontent.com

export default function App() {
  

  return (
    <GoogleOAuthProvider clientId="156718786153-5sr1gd4j03frqbrqnkk4c1dj6ebttlea.apps.googleusercontent.com">
    
        <div className= 'w-full h-screen  relative bg-primary'>
          <Toaster position='top-center' />
          <Routes>
            <Route path='/*' element={<HomePage />} />
            {/* <Route path='/products' element={<ProductCard />} /> */}
            <Route path='/admin/*' element={<AdminPage />} />
            <Route path='/test' element={<TestPage />} />
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage />}/>
            <Route path='/forgot-password' element={<ForgetPassword />}/>
            
          </Routes>
        </div>
      </GoogleOAuthProvider>

          
      

      
  
  )
}
