import { useLoaderData } from 'react-router';
import MealCard from './MealCard';
import { Link } from 'react-router-dom';

function CategoryMeals() {
  const data = useLoaderData();
  const { meals, category } = data;
  return (
    <div className="bg-slate-900 text-white p-10 relative min-h-screen">
      <Link
        to="/"
        className="absolute top-5 left-5 p-2 bg-slate-800 rounded-lg hover:bg-slate-700"
      >
        Home
      </Link>
      <p className="font-bold text-3xl px-20">Category: {category}</p>
      <div className="grid grid-cols-4 gap-5 ">
        {meals.map((meal) => {
          return <MealCard meal={meal} key={meal.idMeal} />;
        })}
      </div>
    </div>
  );
}

export default CategoryMeals;
export async function loader({ params }) {
  const { category } = params;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await res.json();
  const meals = data.meals;

  return { meals, category };
}
