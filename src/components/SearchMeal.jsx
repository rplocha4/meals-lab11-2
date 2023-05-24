import { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchMeal() {
  const [results, setResults] = useState([]);

  const getMeals = (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.meals) {
          setResults([]);
          return;
        }
        setResults(data.meals.splice(0, 5));
      });
  };

  return (
    <div className="relative w-52 p-1">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-inherit p-3"
        onChange={(e) => {
          getMeals(e.target.value);
        }}
      />
      {results.length > 0 && (
        <div className="absolute w-10/12 flex flex-col rounded-md  hover:cursor-pointer ">
          {results.map((result) => {
            return (
              <Link
                to={`/meal/${result.idMeal}`}
                className=" bg-slate-500 flex items-center hover:cursor-pointer p-2 gap-2 hover:bg-slate-700"
                key={result.idMeal}
              >
                <img
                  src={result.strMealThumb}
                  alt={result.strMeal}
                  className="rounded-full"
                  style={{ height: '40px', width: '40px' }}
                />
                <p>{result.strMeal}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchMeal;
