import React from 'react';
import TablePresenter from './TablePresenter';


const TableContainer = ({onPost, posts}) => {
    const handlePost = (e) => {
        const id = e.target.id;
        onPost(id)
    }
    return (
        <TablePresenter handlePost={handlePost} posts={posts}/>
    );
};

export default TableContainer;