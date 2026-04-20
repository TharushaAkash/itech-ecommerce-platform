
import './App.css'
import HomePage from '../pages/homePage'
import ProductCard from './components/productCard'
import AdminPage from '../pages/adminPage'
import { Routes, Route } from 'react-router-dom'
import TestPage from '../pages/test'
import LoginPage from '../pages/loginPage'
import { Toaster } from 'react-hot-toast'

export default function App() {
  

  return (
    
        <div className= 'w-full h-screen  relative bg-primary'>
          <Toaster position='top-center' />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductCard />} />
            <Route path='/admin/*' element={<AdminPage />} />
            <Route path='/test' element={<TestPage />} />
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
        </div>

          
      

      
  
  )
}
