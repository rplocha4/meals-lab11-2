import { useLoaderData } from 'react-router';
import { Link } from 'react-router-dom';
const mapIngredients = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    } else {
      break;
    }
  }
  return ingredients;
};

const formatInstructions = (instructions) => {
  return instructions.split('\n').map((instruction) => {
    return <p key={instruction}>{instruction}</p>;
  });
};

function MealInfo() {
  const data = useLoaderData();
  const { meal } = data;
  const ingredients = mapIngredients(meal);

  return (
    <div className="flex flex-col min-h-screen items-center p-20 bg-slate-900 text-white relative gap-10">
      <Link
        to="/"
        className="absolute top-5 left-5 p-2 bg-slate-800 rounded-lg hover:bg-slate-700"
      >
        Home
      </Link>
      <div className="flex w-full items-center justify-around">
        <div className="flex flex-col items-center gap-5">
          <p className="font-bold text-xl">{meal.strMeal}</p>
          <img src={meal.strMealThumb} alt="" className="w-80 h-80" />
        </div>
        <div className="flex flex-col gap-5 ">
          <p className="font-bold text-xl text-center">Ingrediens</p>
          <div className="grid grid-cols-3 gap-5">
            {ingredients.map((ingredient) => {
              return (
                <div
                  key={ingredient}
                  className="flex flex-col justify-center items-center"
                >
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${ingredient.ingredient}.png`}
                    className="w-20 h-20"
                  />
                  <p>
                    {ingredient.ingredient} {' - '} {ingredient.measure}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full">
        <p className="font-bold text-xl text-center">Instructions</p>
        <p className="text-center">
          {formatInstructions(meal.strInstructions)}
        </p>
      </div>
    </div>
  );
}

export default MealInfo;

export async function loader({ params }) {
  const { id } = params;
  const mealInfo = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await mealInfo.json();
  const meal = data.meals[0];
  return { meal };
}
