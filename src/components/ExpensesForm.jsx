import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";

const Expenses = () => {
  const storedExpenses = JSON.parse(sessionStorage.getItem("expenses")) || [
    {
      date: "2025-05-04",
      title: "Example Expense",
      description: "Example Expense",
      amount: 50.0,
      category: "Food",
      priority: "High",
    },
  ];

  const storedCategories = JSON.parse(sessionStorage.getItem("categories")) || [
    "Food",
    "Rent",
    "Utilities",
    "Transportation",
  ];

  const [expenses, setExpenses] = useState(storedExpenses);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    amount: "",
    category: "Food",
    priority: "High",
  });

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(storedCategories);
  const [showExpenses, setShowExpenses] = useState(false); 

  useEffect(() => {
    sessionStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    sessionStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    setExpenses((prev) => [
      ...prev,
      { ...formData, amount: parseFloat(formData.amount) },
    ]);
    setFormData({
      title: "",
      description: "",
      date: "",
      amount: "",
      category: "Food",
      priority: "High",
    });
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  const toggleExpensesTable = () => {
    setShowExpenses((prev) => !prev);
  };

  const handleRemoveExpense = (indexToRemove) => {
    const updatedExpenses = expenses.filter((_, index) => index !== indexToRemove);
    setExpenses(updatedExpenses);
  };

  return (
    <>
      <Header />

      <main className="container my-5">
        <h2 className="mb-4">Expenses</h2>

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={handleAddExpense}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="ex. Grocery Run"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="ex. Bought food for the week"
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((cat, index) => (
                      <option key={index}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Add Expense</button>
            </form>
          </div>

          <div className="col-md-4">
            <div className="border p-3 rounded bg-light">
              <h4 className="mb-3">Create New Category</h4>
              <label htmlFor="new-category-input" className="form-label">New Category Name:</label>
              <input
                type="text"
                id="new-category-input"
                className="form-control mb-3"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="ex. Subscriptions"
              />
              <button type="button" className="btn btn-primary w-100" onClick={handleAddCategory}>
                Create New Category
              </button>
            </div>
          </div>
        </div>

        <div className="my-4">
          <button className="btn btn-outline-secondary" onClick={toggleExpensesTable}>
            {showExpenses ? "Hide All Expenses" : "View All Expenses"}
          </button>
        </div>

        {showExpenses && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, idx) => (
                  <tr key={idx}>
                    <td>{exp.date}</td>
                    <td>{exp.title}</td>
                    <td>{exp.description}</td>
                    <td>${exp.amount.toFixed(2)}</td>
                    <td>{exp.category}</td>
                    <td>{exp.priority}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveExpense(idx)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default Expenses;