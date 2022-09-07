import { Stack, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/BudgetComponents/AddBudgetModal";
import AddExpenseModal from "./components/BudgetComponents/AddExpenseModal";
import ViewExpensesModal from "./components/BudgetComponents/ViewExpensesModal";
import BudgetCard from "./components/BudgetComponents/BudgetCard";
import UncategorizedBudgetCard from "./components/BudgetComponents/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/BudgetComponents/TotalBudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import SideNav from "./components/NavBars/SideNav";
import "./Styles/Budget.css";
function BudgetApp() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <div className="budget d-flex">
      <div>
        <SideNav />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <Container className="my-4" style={{ alignItems: "center" }}>
            <Stack
              direction="horizontal"
              className="mb-4"
              style={{ paddingRight: "5%", marginLeft: "5%", marginTop: "5%" }}
            >
              <Button
                color="success"
                onClick={() => setShowAddBudgetModal(true)}
              >
                Add Budget
              </Button>
              <Button
                color="green"
                onClick={openAddExpenseModal}
                style={{ margin: "0px 8px" }}
              >
                Add Expense
              </Button>
            </Stack>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
                alignItems: "center",
                marginRight: "250px",
                marginLeft: "250px",
              }}
            >
              {budgets.map((budget) => {
                const amount = getBudgetExpenses(budget.id).reduce(
                  (total, expense) => total + expense.amount,
                  0
                );
                return (
                  <BudgetCard
                    key={budget.id}
                    name={budget.name}
                    amount={amount}
                    max={budget.max}
                    onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                    onViewExpensesClick={() =>
                      setViewExpensesModalBudgetId(budget.id)
                    }
                  />
                );
              })}
              <UncategorizedBudgetCard
                onAddExpenseClick={openAddExpenseModal}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
                }
              />
              <TotalBudgetCard />
            </div>
          </Container>
          <AddBudgetModal
            show={showAddBudgetModal}
            handleClose={() => setShowAddBudgetModal(false)}
          />
          <AddExpenseModal
            show={showAddExpenseModal}
            defaultBudgetId={addExpenseModalBudgetId}
            handleClose={() => setShowAddExpenseModal(false)}
          />
          <ViewExpensesModal
            budgetId={viewExpensesModalBudgetId}
            handleClose={() => setViewExpensesModalBudgetId()}
          />
        </div>
      </div>
    </div>
  );
}

export default BudgetApp;
