import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import {MDBCard, MDBCardBody, MDBCardHeader, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit';
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
          <MDBCard>
            <MDBCardHeader>
              <h3>Transactions</h3>
            </MDBCardHeader>
            <MDBCardBody>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {currPageTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </MDBCardBody>
              <ReactPaginate>
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageNums}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              </ReactPaginate>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

//     <div className="transactions-table">
//       <table>
//         <thead>
//           <tr>
//             <th style={{color: "white" }}>Date</th>
//             <th style={{color: "white" }}>Description</th>
//             <th style={{color: "white" }}>Category</th>
//             <th style={{color: "white" }}>Amount</th>
//           </tr>
//         </thead>
//         {currPageTransactions.map((account) => (
//           <tbody key={account.transaction_id}>
//             <tr>
//               <td style={{color: "white" }}>{account.date}</td>
//               <td style={{color: "white" }}>{account.name}</td>
//               <td style={{color: "white" }}>{account.category[0]}</td>
//               {account.amount > 0 ? (
//                 <td style={{color: "white" }}>-${account.amount.toFixed(2)}</td>
//               ) : (
//                 <td className="refunds">${`${-account.amount.toFixed(2)}`}</td>
//               )}
//             </tr>
//           </tbody>
//         ))}
//       </table>
//       <div className="pagination">
//         <ReactPaginate
//           previousLabel={"<"}
//           nextLabel={">"}
//           pageCount={pageNums}
//           onPageChange={changePage}
//           containerClassName={"paginationBtns"}
//           activeClassName={"paginationActive"}
//         />
//       </div>
//     </div>
//   );
// }

export default Table;
