import React, { useEffect, useState, useCallback } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneFileImageLoader from 'cornerstone-file-image-loader';
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import cornerstoneMath from 'cornerstone-math';
import * as dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';
import styled from 'styled-components'

const CanvasWrapper = styled.div `
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

const InfoRowsUp = styled.div `
  display: flex;
  justify-content: space-between;
`;

const InfoRowsDown = styled(InfoRowsUp)`
 
  align-items: flex-end;
`;

const Canvas = styled.canvas `
  width: 100% !important;
  height: 512px !important;
`;

// **** CSS
const Container = styled.div `
    width: 100% !important;
    height: 100% !important;
    column-gap: 1.5rem;
    display: grid;

`;

const ViewPresenter = (props) => {
  const {onChange,img,uploaded, viewer2} = props;
  const [state, setState] = useState({});


  // NOTE conerstoneTools
  cornerstoneTools.external.cornerstone = cornerstone;
  cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
  cornerstoneTools.external.Hammer = Hammer;

  // NOTE cornerstoneWADOImageLoader
  cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  cornerstoneFileImageLoader.external.cornerstone = cornerstone;
  cornerstoneWebImageLoader.external.cornerstone = cornerstone;


  cornerstoneTools.init({
    mouseEnabled: true,
    touchEnabled: true,
    globalToolSyncEnabled: true,
    showSVGCursors: false,
  });

    const {
      WwwcTool = cornerstone.WwwcTool,
      ZoomTool = cornerstone.ZoomTool,
    } = cornerstoneTools;

    /**
     * cornerston tool setting
     */
    useEffect(()=>{
      const elements = [document.getElementById('viewer'), document.getElementById('deeplearning-viewer')];
      console.log(elements)
      
      /**
       * sychronize test
       */
      // const synchronizer = new cornerstoneTools.Synchronizer(
      //   'cornerstoneimagerendered',
      //   cornerstoneTools.wwwcSynchronizer
      // );
      // elements.forEach(el=> {
      //   synchronizer.add(el);
      // });
      // console.log(elements)
      // synchronizer.enabled = true;

      cornerstoneTools.addTool(WwwcTool)
      cornerstoneTools.addTool(ZoomTool)
      cornerstoneTools.setToolActive('Wwwc', {mouseButtonMask: 1});
      cornerstoneTools.setToolActive('Zoom', {mouseButtonMask: 2});
    },[WwwcTool,ZoomTool])

    /**
     * local viewer setting
     */
    useEffect(()=>{
      const element = document.getElementById('viewer');
      cornerstone.enable(element);

      if (img !== undefined){

        cornerstone
        .loadImage(img)
        .then(image => {
          const {byteArray} = image.data;
          console.log(image)

          const dataSet = dicomParser.parseDicom(byteArray);

          const patientBirth = dataSet.string('x00100030');
          const patientSex = dataSet.string('x00100040');
          const imgStudyDate = dataSet.string('x00080020');
          const seriesNumber = dataSet.string('x00200011');
          const stationName = dataSet.string('x00081010');
          const protocol = dataSet.string('x00181030');
          const imgModality = dataSet.string('x00080060');
          const center = dataSet.string('x00281050');
          const width = dataSet.string('x00281051');

          const viewport = cornerstone.getDefaultViewportForImage(element, image);

          setState({
              ...state,
              patientBirth,
              patientSex,
              imgStudyDate,
              seriesNumber,
              stationName,
              protocol,
              imgModality,
              width,
              center,
              element
          });

          cornerstone.displayImage(element, image, viewport);
        });
      }
    },[img])
    
    /**
     * server viewer setting
     */
    useEffect(()=>{
      const element = document.getElementById('deeplearning-viewer');
      cornerstone.enable(element);
      if(viewer2 !== undefined){
        console.log('test1 : ', viewer2 )
        cornerstone
        .loadImage(viewer2)
        .then(image => {
            cornerstone.displayImage(element, image);
        });
      }
    },[viewer2])


    return (
      <>
        <h1>Dicom Viewer</h1>
        <input type="file" accept=".dcm" onChange={onChange}/>
        <br />
        <div style={{width:'100%', display:'flex', flexDirection:'row'}}>
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
          <Canvas className="cornerstone-canvas"/>
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
          <Canvas className="cornerstone-canvas"/>
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