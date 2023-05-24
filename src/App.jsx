import './App.css';
import Meals from './components/Meals';
import SearchMeal from './components/SearchMeal';

function App() {
  return (
    <div className="flex flex-col items-center bg-slate-900 text-white min-h-screen">
      <SearchMeal />

      <div className="h-full w-full flex justify-center items-center">
        <Meals />
      </div>
    </div>
  );
}

export default App;
