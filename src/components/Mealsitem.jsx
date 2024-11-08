import { useContext } from "react";
import Button from "../UI/Button";
import { currencyFormatter } from "../utils/format";
import CartContext from "./cartcontext";
export default function Mealsitem({ meal }) {
  const cartctx = useContext(CartContext);
  function handleaddmealitem() {
    cartctx.additem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3></h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleaddmealitem}> Add to cart</Button>
        </p>
      </article>
    </li>
  );
}
