import {  Card, ProgressBar, Stack } from "react-bootstrap"
import SideNav from "../components/SideNav/SideNav"
import { currencyFormatter } from "../utils"
import { MDBBtn } from "mdb-react-ui-kit"
export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-light")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <div>
      
      <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVariant(amount, max)}
          min={0}
            max={max}
            now={amount}
            />
            )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <MDBBtn
              color='outline-success'
              className="ms-auto"
              onClick={onAddExpenseClick}
              >
              Add Expense
            </MDBBtn>
            <MDBBtn onClick={onViewExpensesClick} color='outline-success'>
              View Expenses
            </MDBBtn>
          </Stack>
        )}
      </Card.Body>
    </Card>
</div>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "primary"
  if (ratio < 0.75) return "warning"
  return "danger"
}