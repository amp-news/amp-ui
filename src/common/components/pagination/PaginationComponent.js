import React from 'react';
import PropTypes from 'prop-types';
import FirstPageLink from './FirstPageLink';
import LastPageLink from './LastPageLink';
import Page from './PageLink';

const calculateRange = arg => {
  const { total, current, display } = arg;
  let end = total;
  let start = 1;
  if (display < end) {
    // rounded to the nearest integer smaller
    let beforeNumber = Math.round(display / 2 - 0.5);
    const afterNumber = beforeNumber;
    if (display % 2 === 0) {
      beforeNumber -= 1;
    }

    if (current <= beforeNumber + 1) {
      end = display;
    } else if (current >= total - afterNumber) {
      start = total - display + 1;
    } else {
      start = current - beforeNumber;
      end = current + afterNumber;
    }
  }

  return { end, start };
};

const getStateFromProps = props => {
  let { total, current, display } = props;
  total = total > 0 ? total : 1;
  current = current > 0 ? current : 1;
  display = display > 0 ? display : 1;
  current = current < total ? current : total;
  display = display < total ? display : total;
  return { current, display, total };
};

const Pagination = props => {
  const { current, display, total } = getStateFromProps(props);
  const { start, end } = calculateRange({ current, display, total });
  const { onChange } = props;
  const array = [];
  for (let i = start; i <= end; i += 1) {
    array.push(i);
  }
  return (
    <div>
      <FirstPageLink onChange={onChange} />
      {array.map((page, k) => (
        <Page key={k} value={page} isActive={current === page} onChange={onChange} />
      ))}
      <LastPageLink onChange={onChange} lastPage={total} />
    </div>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  display: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

Pagination.displayName = 'Pagination';
export default Pagination;
