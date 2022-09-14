import { MDBContainer } from "mdb-react-ui-kit";
import { useBudgets } from "../../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  return (
    //renders if budget has been set
    <div>
      {!!max ? (
        <div className="vstack gap-2 align-items-center">
          <div
            className="fw-bold mb-3 mx-auto"
            style={{
              width: "450px",
              fontSize: 20,
              color: "white",
              textAlign: "center",
              background: "#1CAC78",
              border: "1px solid #1CAC78",
              borderRadius: "7px",
              marginTop: "100px",
            }}
          >
            Monthly Budget
          </div>
          <BudgetCard
            amount={amount}
            name="Total Spent"
            white
            max={max}
            hideButtons
          />
        </div>
      ) : (
        //renders if no budget is set yet
        <MDBContainer className="vstack gap-2 align-items-center">
          <div
            className="fw-bold mb-3 mx-auto"
            style={{
              width: "450px",
              fontSize: 20,
              color: "white",
              textAlign: "center",
              background: "#1CAC78",
              border: "1px solid #1CAC78",
              borderRadius: "7px",
              marginTop: "100px",
            }}
          >
            Monthly Budget
          </div>
          <BudgetCard
            amount={amount}
            name="Total Spent"
            white
            max={500}
            hideButtons
          />
        </MDBContainer>
      )}
    </div>
  );
}
