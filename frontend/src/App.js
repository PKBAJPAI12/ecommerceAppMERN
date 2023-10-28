import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/Home";
import Products from "./components/Products";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" Component={Home}/>
      <Route path="/products" Component={Products}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
