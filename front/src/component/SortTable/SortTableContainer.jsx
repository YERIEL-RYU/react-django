//SortTableContainer.jsx

import React, {useState} from 'react';
import SortTablePresenter from './SortTablePresenter';

const SortTableContainer = () => {
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('id');
  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const desc = (a, b, sequenceBy) => {
    if (b[sequenceBy] < a[sequenceBy]) {
      return -1;
    }
    if (b[sequenceBy] > a[sequenceBy]) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const sequence = cmp(a[0], b[0]);
      if (sequence !== 0) return sequence;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getSorting = (sequence, sequenceBy) => {
    return sequence === 'desc'
      ? (a, b) => desc(a, b, sequenceBy)
      : (a, b) => -desc(a, b, sequenceBy);
  };
  
  return (
    <SortTablePresenter 
      order={order}
      orderBy={orderBy}
      handleRequestSort={handleRequestSort}
      stableSort={stableSort}
      getSorting={getSorting}
    />
  );
};

export default SortTableContainer;