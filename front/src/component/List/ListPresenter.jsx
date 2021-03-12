import React from 'react';
import { Button } from '@material-ui/core';

import Table from '../Table'


const ListPresenter = (props) => {
  const {onWrite, onPost} = props;
  return (
    <>
      <Table onPost={onPost}/>
      <Button type='button' variant='contained' onClick={onWrite}>글쓰기</Button>
    </>
  );
};

export default ListPresenter;
