import React from "react";

import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
// Adding a "Meals" Component
const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />
      <AvailableMeals />
    </React.Fragment>
  );
};

export default Meals;

//  Component Meals.js  để hiển thị ra danh sách các món ăn có thể Oder
