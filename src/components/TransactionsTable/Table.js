import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBFooter,
} from "mdb-react-ui-kit";
function Table({ transactions }) {
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = ({ selected }) => setCurrentPage(selected);

  //for pagination
  const transactionsPerPage = 15;
  const lastTransactionIndex = currentPage * transactionsPerPage;
  const currPageTransactions = transactions.slice(
    lastTransactionIndex,
    lastTransactionIndex + transactionsPerPage
  );

  let pageNum = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <MDBContainer>
      <MDBCard style={{ width: "50vw" }}>
        <MDBCardHeader style={{ textAlign: "center" }}>
          <h3>Transactions</h3>
        </MDBCardHeader>
        <MDBCardBody style={{ background: "white" }}>
          <table
            className="table table-striped"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {currPageTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.category[0]}</td>
                  {transaction.amount > 0 ? (
                    <td>-${transaction.amount.toFixed(2)}</td>
                  ) : (
                    <td style={{ color: "green" }}>
                      ${`${-transaction.amount.toFixed(2)}`}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </MDBCardBody>
        <MDBFooter style={{ margin: "0 45%" }}>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageNum}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </MDBFooter>
      </MDBCard>
    </MDBContainer>
  );
}

export default Table;
