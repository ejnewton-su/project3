import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Expenses from "./components/ExpensesForm.jsx";
import Budget from "./components/BudgetPage.jsx";
import HomePage from "./components/HomePage.jsx";
import { AppContext } from "./AppContext.jsx";

const App = () => {
  const { user } = useContext(AppContext);
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
  );
};

export default App;