import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Slideshow from "../Slideshow/Slideshow"


import styled from 'styled-components';

const Header = styled.div``;
const Title = styled.div`
  padding: 1px;
`;
const Post = styled(Link)`
  font-size: x-large;
  font-weight: 600;
  text-decoration-line: none;
  color: black;
`;

const index = (props) => {
  console.log(props);
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header className="header">
          <Post to="/">POST</Post>
        </Header>
        <Divider />
        <Slideshow />
        <Title className="title">
          <h3>공지사항</h3>
        </Title>
        {props.children}
      </Container>
    </>
  );
};

export default index;
