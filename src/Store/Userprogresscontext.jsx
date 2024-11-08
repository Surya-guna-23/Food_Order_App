import { createContext, useState } from "react";

const Userprogresscontext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function UserprogresscontextProvider({ children }) {
  const [userprogress, setuserprogress] = useState(" ");
  function showCart() {
    setuserprogress("cart");
  }
  function hideCart() {
    setuserprogress(" ");
  }
  function showCheckout() {
    setuserprogress("checkout");
  }
  function hideCheckout() {
    setuserprogress(" ");
  }
  const userprogressctx = {
    progress: userprogress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <Userprogresscontext.Provider value={userprogressctx}>
      {children}
    </Userprogresscontext.Provider>
  );
}
export default Userprogresscontext;
