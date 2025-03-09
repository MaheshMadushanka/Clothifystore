import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Layout from './components/UserComponents/Layout/Layout'
import Homepage from './pages/Homepage'
import ProductDisplay from './components/UserComponents/ProductCard/ProductDisplay'
import AddProduct from './pages/Adminpages/addProduct/addProduct'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout><Homepage/></Layout>}/>
        <Route path="/displayProduct" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
