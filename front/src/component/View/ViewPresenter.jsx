import React, { useEffect, useState, useCallback } from 'react';

import styled from 'styled-components'

const CanvasWrapper = styled.div`
  && {
    width: 100%;
    
    height: 100%;
    background: black;
    color: white;
    display: grid;
    grid-auto-flow: row;
    padding: 10px;
    float:left;
    border: 2px solid gray;
  }
`;

const InfoRowsUp = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoRowsDown = styled(InfoRowsUp)`
 
  align-items: flex-end;
`;

const Canvas = styled.canvas`
  width: 100% !important;
  height: 100% !important;
`;

// **** CSS
const Container = styled.div`
    width: 100% !important;
    height: 100% !important;
    column-gap: 1.5rem;
    display: grid;

`;

const ViewPresenter = (props) => {
  const { onChange, img, uploaded, viewer2, state, onChangePng, onCapture } = props;



  return (
    <>
      <h1>Dicom Viewer</h1>
      <input type="file" onChange={onChange} />
      {/* <input type="file" accept=".png" onChange={onChangePng}/> */}
      <button onClick={onChangePng}>prediction</button>
      <button onClick={onCapture}>다운로드</button>
      <br />
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <CanvasWrapper id="viewer">
          <InfoRowsUp>
            <div>
              <div>DOB : {state.patientBirth}</div>
              <div>Sex : {state.patientSex}</div>
            </div>
            <div>
              <div>Modality: {state.imgModality}</div>
              <div>SeriesNumber : {state.seriesNumber}</div>
            </div>
          </InfoRowsUp>
          <Canvas className="cornerstone-canvas" />
          <InfoRowsDown>
            <div>
              <div>StudyDate : {state.imgStudyDate}</div>
              <div>Protocol: {state.protocol}</div>
            </div>
            <div>
              <div>WW: {state.width}</div>
              <div>WC: {state.center}</div>
            </div>
          </InfoRowsDown>
        </CanvasWrapper>
        <CanvasWrapper id="deeplearning-viewer">
          <InfoRowsUp>
            <div>
              <div>DOB : {state.patientBirth}</div>
              <div>Sex : {state.patientSex}</div>
            </div>
            <div>
              <div>Modality: {state.imgModality}</div>
              <div>SeriesNumber : {state.seriesNumber}</div>
            </div>
          </InfoRowsUp>
          <Canvas className="cornerstone-canvas" />
          <InfoRowsDown>
            <div>
              <div>StudyDate : {state.imgStudyDate}</div>
              <div>Protocol: {state.protocol}</div>
            </div>
            <div>
              <div>WW: {state.width}</div>
              <div>WC: {state.center}</div>
            </div>
          </InfoRowsDown>
        </CanvasWrapper>
      </div>
    </>
  );
};

export default ViewPresenter;