import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MealInfo from './components/MealInfo.jsx';
import { loader as mealLoader } from './components/MealInfo.jsx';
import CategoryMeals from './components/CategoryMeals.jsx';
import { loader as categoryLoader } from './components/CategoryMeals.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/meal/:id',
    element: <MealInfo />,
    loader: mealLoader,
  },
  {
    path: '/category/:category',
    element: <CategoryMeals />,
    loader: categoryLoader,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
