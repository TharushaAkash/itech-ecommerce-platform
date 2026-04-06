
import './App.css'
import HomePage from '../pages/homePage'
import ProductCard from './components/productCard'
import AdminPage from '../pages/adminPage'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  

  return (
    
        <div className= 'w-full h-screen border-[6px] relative'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/products' element={<ProductCard />} />
            <Route path='/admin' element={<AdminPage />} />
          </Routes>
        </div>

          
      

      
  
  )
}
