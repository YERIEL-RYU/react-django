import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const ToolbarDiv = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SearchDiv = styled.div`
  display: flex;
  height: 50px;
  outline: none;
  padding-left: 5px;
`;

const SingleSearchDiv = styled.div`
  display: flex;
  height: 40px;
  outline: none;
  padding-left: 5px;
  max-width: 328px;
  float: right;
`;
const CountLable = styled(Typography)`
  padding-top: 10px;
`;

export const ToolbarContainer = (props) => (
  <ToolbarDiv {...props}>{props.children}</ToolbarDiv>
);

export const SearchContainer = (props) => (
  <SearchDiv {...props}>{props.children}</SearchDiv>
);
export const SingleSearchContainer = (props) => (
  <SingleSearchDiv {...props}>{props.children}</SingleSearchDiv>
);

export const ListCount = ({ count }) => <CountLable>{count} 건</CountLable>;
