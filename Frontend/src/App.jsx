import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import Layout from './components/UserComponents/Layout/Layout'
import Homepage from './pages/Homepage'
import ProductDisplay from './components/UserComponents/ProductCard/ProductDisplay'
import ProductDetails from './components/UserComponents/ProductCard/ProductDetails'
import OrderSummary from './components/UserComponents/Order/OrderSummary'
import { AuthProvider } from './Context/AuthContext'
import LoginForm from './pages/Userpages/LogIn/login'
import Signin from './pages/Userpages/SingIn/signin'
import Logout from './pages/Userpages/Logout/logout'
import UserAddressForm from './components/UserComponents/Order/UserAddressForm '
//import Payhere from './components/UserComponents/Payhere'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route path="/homepage" element={<Layout><Homepage/></Layout>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path="/displayProduct/Men" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/displayProduct/Kid" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/displayProduct/Women" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/displayProduct/Men" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/product-details" element={<ProductDetails/>}/>
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/userAddressForm" element={<UserAddressForm/>}/>
        {/* <Route path="/payhere" element={<Payhere/>}/> */}


      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
