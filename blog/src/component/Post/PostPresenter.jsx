import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Divider } from '@material-ui/core';

import Table from '../Table'

import styled from 'styled-components';

const Header = styled.div``;
const Title = styled.div`
    padding : 1px;
`;

const PostPresenter = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
          <Header className='header'>
              <h1>POST</h1>
          </Header>
          <Divider />
          <Title className='title'>
              <h3>공지사항</h3>
          </Title>
          <Table />
      </Container>
    </>
  );
};

export default PostPresenter;
