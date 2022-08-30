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
    <div className="transactions-table">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        {currPageTransactions.map((account) => (
          <tbody key={account.transaction_id}>
            <tr>
              <td>{account.date}</td>
              <td>{account.name}</td>
              <td>{account.category[0]}</td>
              {account.amount > 0 ? (
                <td>-${account.amount.toFixed(2)}</td>
              ) : (
                <td className="refunds">${`${-account.amount.toFixed(2)}`}</td>
              )}
            </tr>
          </tbody>
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
