import React from 'react';
import { AppProvider } from './context/AppContext';
import Budget from './src/components/BudgetComponents/Budget';
import ExpenseTotal from './src/components/BudgetComponents/ExpenseTotal';
import ExpenseList from './src/components/BudgetComponents/ExpenseList';
import AddExpenseForm from './src/components/BudgetComponents/AddExpenseForm';
import RemainingBudget from './src/components/BudgetComponents/Remaining';

const BudgetApp = () => {
  return (
    <AppProvider>
      <div className='container'>
        <h1 className='mt-3'>My Budget Planner</h1>
        <div className='row mt-3'>
          <div className='col-sm'>
            <Budget />
          </div>
          <div className='col-sm'>
            <RemainingBudget />
          </div>
          <div className='col-sm'>
            <ExpenseTotal />
          </div>
        </div>
        <h3 className='mt-3'>Expenses</h3>
        <div className='row '>
          <div className='col-sm'>
            <ExpenseList />
          </div>
        </div>
        <h3 className='mt-3'>Add Expense</h3>
        <div className='row mt-3'>
          <div className='col-sm'>
            <AddExpenseForm />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default BudgetApp;
