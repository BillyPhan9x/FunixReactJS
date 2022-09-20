import React, { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  // Managing Cart & Modal State
  const [openIsCart, setOpenIsCart] = useState(false);

  const showCartHandler = () => {
    setOpenIsCart(true);
  };

  const hideCartHandler = () => {
    setOpenIsCart(false);
  };
  return (
    <CartProvider>
      {openIsCart && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />;
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
