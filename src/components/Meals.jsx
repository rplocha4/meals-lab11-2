import { useEffect, useState } from 'react';
import MealCard from './MealCard';
import { Link } from 'react-router-dom';
import Loading from './Loading';
function Meals() {
  const [meals, setMeals] = useState([]);
  const [loadingMeals, setLoadingMeals] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getMeals = async () => {
      setLoadingMeals(true);
      const mealRes = [];
      for (let i = 0; i < 8; i++) {
        const res = await fetch(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        const data = await res.json();
        mealRes.push(data.meals[0]);
      }
      return mealRes;
    };
    getMeals().then((res) => {
      setMeals(res);
      setLoadingMeals(false);
    });
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      setLoadingCategories(true);
      const res = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      );
      const data = await res.json();
      setCategories(data.meals);
      setLoadingCategories(false);
    };
    getCategories();
  }, []);

  if (loadingMeals || loadingCategories) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col ">
      <p className="font-bold text-3xl px-20">Random Meals</p>
      <div className="grid grid-cols-4 p-10">
        {meals.map((meal) => {
          return <MealCard meal={meal} key={meal.idMeal} />;
        })}
      </div>

      <div className="flex flex-col ">
        <p className="font-bold text-3xl px-20"> Browse by categories</p>
        <div className="flex flex-wrap justify-center gap-5 p-10">
          {categories.map((category, i) => {
            return (
              <Link
                to={`/category/${category.strCategory}`}
                className="bg-slate-500 p-2 rounded-lg hover:bg-slate-700
                hover:cursor-pointer"
                key={i}
              >
                {category.strCategory}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Meals;
