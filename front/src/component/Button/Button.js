import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlueButton = styled.div`
  text-align: center;
  margin: auto 0;
  background-color: blue;
  padding: 15px 40px;
  color: white;
  border-radius: 30px;
  font-size: large;
  cursor: pointer;
`;

const ButtonLabel = styled.label`
  display: inline-block;
  padding: 0.5em 0.75em;
  color: white;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #3498db;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: 0.25em;
  text-align: center;
  width: 350px;
`;

const SqureButton = styled.div`
  display: inline-block;
  padding: 0.5em 0.75em;
  background-color: ${(prop) =>
    prop.disabled ? '#e2e2e2' : prop.color ? prop.color : '#3498db'};
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  color: ${(prop) => (prop.disabled ? '#999999' : 'white')};
  cursor: ${(prop) => (prop.disabled ? 'wait' : 'pointer')};
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: 0.25em;
  text-align: center;
  width: ${(prop) => (prop.width ? prop.width : '350px')};
  height: ${(prop) => (prop.height ? prop.height : '38.5px')};
`;

const ButtonIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 20px;
  margin-right: 10px;
`;

export const DeepLearningButton = (props) => <BlueButton {...props} />;
export const UploadButtonLabel = (props) => (
  <ButtonLabel htmlFor={props.htmlFor}>{props.children}</ButtonLabel>
);
export const CustomSqureButton = (props) => (
  <SqureButton color={props.color} {...props}>
    {props.children}
  </SqureButton>
);
export const Icon = (props) => <ButtonIcon {...props} />;
