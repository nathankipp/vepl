/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Match from '../Match';

const getPagination = (last, page) => {
  let pagination = [];
  if (last === 2) {
    pagination = [1,2];
  } else if (last === 6) {
    pagination = [1,2,3,4,5,6];
  } else if (page >= 1 && page <= 3) {
    pagination = [1,2,3,4,null,last];
  } else if (page + 2 < last) {
    pagination = [1,null,page-1,page,page+1,null,last];
  } else {
    pagination = [1,null,last-3,last-2,last-1,last];
  }
  return pagination;
}

const Fixtures = ({ iterations, fixtures, results }) => {
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [fixtures]);

  const week = fixtures[page-1];
  const pagination = getPagination(fixtures.length, page);

  return (
    <>
      <div className="box">
        <nav className="pagination" role="navigation" aria-label="pagination">
        <a onClick={() => { if (page !== 1) { setPage(page-1) }}} class="pagination-previous" disabled={page===1}>Previous</a>
        <a onClick={() => { if (page !== fixtures.length) { setPage(page+1) }}} class="pagination-next" disabled={page===fixtures.length}>Next</a>
          <ul className="pagination-list">
            {
              pagination.map(p => {
                const current = p === page
                  ? ' is-current'
                  : '';
                const label = p === 1
                  ? 'Week 1'
                  : p;
                return p ? (
                  <li>
                    <a onClick={() => setPage(p)} className={`pagination-link${current}`} aria-label="">
                      {label}
                    </a>
                  </li>
                ) : (
                  <li><span className="pagination-ellipsis">&hellip;</span></li>
                );
              })
            }
          </ul>
        </nav>
      </div>
      <div>
        <div>
          {week.map(fixture => {
            const homeAway = `${fixture.join('')}.${page-1}`;
            return (
              <Match
                key={homeAway}
                fixture={fixture}
                results={results[homeAway]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Fixtures;
