import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
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

  let pageNums = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBCard style={{ background: "#55828B" }}>
            <MDBCardHeader style={{ color: "#fff", background: "#55828B" }}>
              <h3>Transactions</h3>
            </MDBCardHeader>
            <MDBCardBody>
              <table
                className="table"
                style={{ textColor: "#fff", background: "#364958" }}
              >
                <thead>
                  <tr style={{ color: "#fff" }}>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currPageTransactions.map((transaction, index) => (
                    <tr key={index} style={{ color: "#fff" }}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.category}</td>
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
            <div className="pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageNums}
                onPageChange={changePage}
                containerClassName={"paginationBtns"}
                activeClassName={"paginationActive"}
              />
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Table;
