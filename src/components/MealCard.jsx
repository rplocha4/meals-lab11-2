import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Stars from './Stars';

function MealCard({ meal }) {
  const [rate, setRate] = useState(0);

  const mealRateHandler = (rate) => {
    const rates = localStorage.getItem('rates');
    setRate(rate);
    if (rates) {
      const parsedRates = JSON.parse(rates);
      parsedRates[meal.idMeal] = rate;
      localStorage.setItem('rates', JSON.stringify(parsedRates));
    } else {
      const newRates = { [meal.idMeal]: rate };
      localStorage.setItem('rates', JSON.stringify(newRates));
    }
  };
  useEffect(() => {
    const rates = localStorage.getItem('rates');
    if (rates) {
      const parsedRates = JSON.parse(rates);
      if (parsedRates[meal.idMeal]) {
        setRate(parsedRates[meal.idMeal]);
      }
    }
  }, [meal.idMeal]);
  return (
    <div className="flex flex-col justify-center items-center">
      <Link
        to={`/meal/${meal.idMeal}`}
        className="p-5 hover:bg-slate-800 flex flex-col justify-between items-center hover:cursor-pointer gap-3"
      >
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <p className="text-center">{meal.strMeal}</p>
      </Link>
      <Stars onRate={mealRateHandler} rate={rate} />
    </div>
  );
}

export default MealCard;
