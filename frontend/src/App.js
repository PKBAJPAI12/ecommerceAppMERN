import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/Home";
import Products from "./components/Product/Products";
import ProductDetails from "./components/Product/ProductDetails";
import Search from "./components/Search";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
