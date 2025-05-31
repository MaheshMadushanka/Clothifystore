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
import AddProduct from './pages/Adminpages/addProduct/addProduct'
import Editproduct from './components/AdminComponents/Edit Product/Editproduct'
import AdminUserList from './components/AdminComponents/get All User/AdminUserList'
import ProfileSetting from './components/UserComponents/ProfileSetting/ProfileSetting'
import OrdersPage from './components/UserComponents/Order/viewOrder/OrdersPage'
//import Payhere from './components/UserComponents/Payhere'

function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
    <Routes>
        <Route path="/homepage" element={<Layout><Homepage/></Layout>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/displayProduct/Men" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/displayProduct/Kid" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/displayProduct/Women" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/displayProduct/Men" element={<Layout><ProductDisplay/></Layout>}/>
        <Route path="/product-details" element={<ProductDetails/>}/>
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/userAddressForm" element={<UserAddressForm/>}/>
        <Route path="/editeProduct/:id"element={<Editproduct/>}/>
        <Route path="/adminUserList" element={<Layout><AdminUserList/></Layout>}/>
        <Route path="/profileSetting" element={<ProfileSetting/>}/>
        <Route path="/ordersPage" element={<OrdersPage/>}/>
        {/* <Route path="/payhere" element={<Payhere/>}/> */}


      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
