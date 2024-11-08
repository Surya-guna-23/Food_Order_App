import { useContext } from "react";
import Button from "../UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "./cartcontext";
import Userprogresscontext from "../Store/Userprogresscontext";
export default function Header() {
  const carctx = useContext(CartContext);
  const userprogressctx = useContext(Userprogresscontext);
  const totalcartitems = carctx.items.reduce((totalnoofitems, item) => {
    return totalnoofitems + item.quantity;
  }, 0);
  function handleshowcart() {
    console.log("Show Cart triggered");
    userprogressctx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1> React food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleshowcart}>
          Cart {totalcartitems}
        </Button>
      </nav>
    </header>
  );
}
