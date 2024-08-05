import {Routes, Route} from "react-router-dom";

// Components
import MyNavbar from "./components/navbar";

// Pages
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ListingPage from "./pages/List";
import HomePage from "./pages/home";
import BookDetailsPage from "./pages/details";
import OrdersPage from "./pages/viewOrders";
import ViewOrderDetails from "./pages/viewOrderDetails";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/book/list" element={<ListingPage/>} />
      <Route path="/book/view/:bookId" element={<BookDetailsPage />} />
      <Route path="/book/orders" element={<OrdersPage />} />
      <Route path="/books/orders/:bookId" element={<ViewOrderDetails />} />
    </Routes>
    </div>
    
  );
}

export default App;
