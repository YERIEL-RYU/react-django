import React from 'react';
import ListPresenter from './ListPresenter';

const ListContainer = ({history}) => {
    const onWrite = () => {
        history.push('/write')
    }
    const onPost = (id) => {
        history.push(`/post/${id}`)
    }
    return (
        <ListPresenter onPost={onPost} onWrite={onWrite}/>
    );
};

export default ListContainer;