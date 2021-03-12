import React from 'react';
import TablePresenter from './TablePresenter';


const TableContainer = ({onPost}) => {
    return (
        <TablePresenter onPost={onPost}/>
    );
};

export default TableContainer;