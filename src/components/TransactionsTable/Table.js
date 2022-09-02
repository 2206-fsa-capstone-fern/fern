import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function Table({ transactions }) {
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = ({ selected }) => setCurrentPage(selected);

  //for pagination
  const transactionsPerPage = 20;
  const lastTransactionIndex = currentPage * transactionsPerPage;
  const currPageTransactions = transactions.slice(
    lastTransactionIndex,
    lastTransactionIndex + transactionsPerPage
  );

  let pageNums = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div>
      <table className="transactions-table">
        <thead>
          <tr className="transaction-headers">
            <th className="transaction-header">Date</th>
            <th className="transaction-header">Description</th>
            <th className="transaction-header">Category</th>
            <th className="transaction-header">Amount</th>
          </tr>
        </thead>
        {currPageTransactions.map((account) => (
            <tr className="transaction-row" key={account.transaction_id}>
              <td className="transaction-row-data">{account.date}</td>
              <td className="transaction-row-data">{account.name}</td>
              <td className="transaction-row-data">{account.category[0]}</td>
              {account.amount > 0 ? (
                <td style={{color: "white" }}>-${account.amount.toFixed(2)}</td>
              ) : (
                <td className="refunds">${`${-account.amount.toFixed(2)}`}</td>
              )}
            </tr>
        ))}
      </table>
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
    </div>
  );
}

export default Table;

// --------------------------------------------------------------------
// import React, { useState } from "react";
// import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";
// import ReactPaginate from "react-paginate";

// function Table({ transactions }) {
//   const [currentPage, setCurrentPage] = useState(0);

//   const changePage = ({ selected }) => setCurrentPage(selected);

//   //for pagination
//   const transactionsPerPage = 20;
//   const lastTransactionIndex = currentPage * transactionsPerPage;
//   const currPageTransactions = transactions.slice(
//     lastTransactionIndex,
//     lastTransactionIndex + transactionsPerPage
//   );

//   let pageNums = Math.ceil(transactions.length / transactionsPerPage);

//   return (
//     <div>
//       <CDBContainer>
//         <CDBTable responsive hover borderless>
//           <CDBTableHeader>
//             <tr>
//               <th style={{ color: "white" }} className="transaction-header">Date</th>
//               <th style={{ color: "white" }} className="transaction-header">Description</th>
//               <th style={{ color: "white" }} className="transaction-header">Category</th>
//               <th style={{ color: "white" }} className="transaction-header">Amount</th>
//             </tr>
//           </CDBTableHeader>
//           <CDBTableBody>
//           {currPageTransactions.map((account) => (
//               <tr key={account.transaction_id} className="transaction-row">
//                 <td className="transaction-row-data">{account.date}</td>
//                 <td className="transaction-row-data">{account.name}</td>
//                 <td className="transaction-row-data">{account.category[0]}</td>
//                 {account.amount > 0 ? (
//                   <td style={{ color: "white" }}>
//                     -${account.amount.toFixed(2)}
//                   </td>
//                 ) : (
//                   <td className="refunds">
//                     ${`${-account.amount.toFixed(2)}`}
//                   </td>
//                 )}
//               </tr>
//           ))}
//           </CDBTableBody>
//         </CDBTable>
//         <div className="pagination">
//           <ReactPaginate
//             previousLabel={"<"}
//             nextLabel={">"}
//             pageCount={pageNums}
//             onPageChange={changePage}
//             containerClassName={"paginationBtns"}
//             activeClassName={"paginationActive"}
//           />
//         </div>
//       </CDBContainer>
//     </div>
//   );
// }

// export default Table;
