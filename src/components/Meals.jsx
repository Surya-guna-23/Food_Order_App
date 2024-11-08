import { useState, useEffect } from "react";
import Mealsitem from "./Mealsitem";
export default function Meals() {
  const [loadmeals, Setloadmeals] = useState([]);
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
      }
      const meals = await response.json();
      Setloadmeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadmeals.map((meal) => (
        <Mealsitem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
