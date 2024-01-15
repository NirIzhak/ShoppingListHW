import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import OrderPage from "./pages/OrderPage";
import ShoppingListContextProviedr from "./context/ShoppingListContext";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <>
      <ShoppingListContextProviedr>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </BrowserRouter>
      </ShoppingListContextProviedr>
    </>
  );
}

export default App;
