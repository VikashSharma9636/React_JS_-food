import HomeScreen from "../src/components/HomeScreen"
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/Signup";
import Login from "./components/LoginScreen/Login"
import Adminlogin from "./Admin/adminlogin";
import Discover from "./Admin/Discover";
import Adminpage from "./Admin/Adminpage";
import AddProduct from "./Admin/Discover";
import Admincategori from "./Admin/Admincategori";
import Category from "./Admin/Category";
import Drover from "./Admin/Drover";
import Addadit from "./Admin/Addadit";



function App(){
  return(
<BrowserRouter>
<Routes>
  
  <Route path='/' element={<HomeScreen/>}/>
  <Route path='/Signup' element={<Register/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path="/adminlogin" element={<Adminlogin/>}/>
  <Route path="/discover" element={<Discover/>}/>
  <Route path="/Adminpage" element={<Adminpage/>}/>
  <Route path="/addproduct" element={<AddProduct/>}/>
  <Route path="/Admincategori" element={<Admincategori/>}/>
  <Route path="/category" element={<Category/>}/>
 <Route path="/Drover" element={<Drover/>}/>
 <Route path="/Addadit" element={<Addadit/>}/>
 
</Routes>
</BrowserRouter>
  )
}
export default App;