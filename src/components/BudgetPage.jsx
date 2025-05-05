import React, { useState, useEffect } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Budget = () => {
  const [form, setForm] = useState(() => {
    const storedForm = sessionStorage.getItem("budgetForm");
    return storedForm
      ? JSON.parse(storedForm)
      : {
          income: "",
          housing: "",
          food: "",
          gas: "",
          carPayment: "",
        };
  });

  const [customExpenses, setCustomExpenses] = useState(() => {
    const stored = sessionStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });

  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    sessionStorage.setItem("budgetForm", JSON.stringify(form));
    sessionStorage.setItem("expenses", JSON.stringify(customExpenses));

    const fixedTotal =
      parseFloat(form.housing || 0) +
      parseFloat(form.food || 0) +
      parseFloat(form.gas || 0) +
      parseFloat(form.carPayment || 0);

    const customTotal = customExpenses.reduce(
      (sum, exp) => sum + parseFloat(exp.amount || 0),
      0
    );

    const total = fixedTotal + customTotal;
    setTotalExpenses(total);
    sessionStorage.setItem("totalExpenses", total.toString());
  }, [form, customExpenses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Budget saved successfully!");
  };

  const removeCustomExpense = (indexToRemove) => {
    const updated = customExpenses.filter((_, index) => index !== indexToRemove);
    setCustomExpenses(updated);
    sessionStorage.setItem("expenses", JSON.stringify(updated));
  };

  return (
    <div>
      <Header />
      <main className="container my-5">
        <h2 className="mb-4">Monthly Budget</h2>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Total Income</label>
              <input
                type="number"
                name="income"
                className="form-control"
                placeholder="$0.00"
                value={form.income}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Housing</label>
              <input
                type="number"
                name="housing"
                className="form-control"
                placeholder="$0.00"
                value={form.housing}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Food</label>
              <input
                type="number"
                name="food"
                className="form-control"
                placeholder="$0.00"
                value={form.food}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Gas</label>
              <input
                type="number"
                name="gas"
                className="form-control"
                placeholder="$0.00"
                value={form.gas}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Car Payment</label>
              <input
                type="number"
                name="carPayment"
                className="form-control"
                placeholder="$0.00"
                value={form.carPayment}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </form>

        {/* Custom Expenses Section */}
        {customExpenses.length > 0 && (
          <div className="mt-5">
            <h4>Custom Expenses</h4>
            <ul className="list-group">
              {customExpenses.map((expense, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{expense.name}</strong>
                    {expense.description && (
                      <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                        {expense.description}
                      </div>
                    )}
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-3">
                      ${parseFloat(expense.amount).toFixed(2)}
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCustomExpense(index)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Budget Summary */}
        <div className="my-5">
          <h4>Budget vs Expenses</h4>
          <div className="progress">
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{
                width: `${
                  (totalExpenses / parseFloat(form.income || 1)) * 100
                }%`,
              }}
              aria-valuenow={totalExpenses}
              aria-valuemin="0"
              aria-valuemax={form.income}
            >
              ${totalExpenses.toFixed(2)} Expenses
            </div>
          </div>
          <div className="mt-3">
            <p>
              <strong>Total Income: </strong> ${form.income}
            </p>
            <p>
              <strong>Total Expenses: </strong> ${totalExpenses.toFixed(2)}
            </p>
            <p>
              <strong>Remaining Balance: </strong>{" "}
              ${(parseFloat(form.income || 0) - totalExpenses).toFixed(2)}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Budget;