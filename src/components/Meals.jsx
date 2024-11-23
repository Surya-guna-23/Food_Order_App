
import Error from "./Error.jsx";
import Mealsitem from "./Mealsitem";
import useHttp from "./hooks/useHttp";
const requestconfig = {};
export default function Meals() {
const {data:loadmeals,isloading,error}= useHttp('http://localhost:3000/meals',requestconfig,[])

  if(isloading){
    return <p className="center">Fetching meals...</p>
  }
  if(error){
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {loadmeals.map((meal) => (
        <Mealsitem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
