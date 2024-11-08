import { useEffect } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/cart.jsx";
import { CartContextProvider } from "./components/cartcontext";
import { UserprogresscontextProvider } from "./Store/Userprogresscontext";
import Checkout from "./components/Checkout.jsx";
function App() {
  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <>
      <UserprogresscontextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartContextProvider>
      </UserprogresscontextProvider>
    </>
  );
}

export default App;
