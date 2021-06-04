import React, { useEffect, useState, useCallback } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import CornerstoneViewport from 'react-cornerstone-viewport'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneBase64ImageLoader from 'cornerstone-base64-image-loader';
import cornerstoneMath from 'cornerstone-math';
import dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';
import styled from 'styled-components'

const InfoContainer = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 90%;
  height: 90%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const InfoRowsUp = styled.div `
  display: flex;
  justify-content: space-between;
`;

const InfoRowsDown = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ViewPresenter = (props) => {
    const {onChange,img, imgID} = props;
    const [state, setState] = useState({});
    const [element, setElement] = useState()

    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init();

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    const tools= [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      // Scroll
      { name: 'StackScrollMouseWheel', mode: 'active' },
      // Touch
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ]

    const Loader = () => {
      return (
        <div
        className="lds-ripple"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          color: 'white',
          top:'50%',
          left:'50%'
        }}
      >
        <div>이미지를 업로드하세요</div>
      </div>
      )
    };

    const Overlay = () => {
      return (
        <InfoContainer>
          <InfoRowsUp>
          {/* FIXME Disunit Component */}
          {/* TODO Minimize rerender metadata */}
            <div>
              <div>DOB : {state.patientBirth}</div>
              <div>Sex : {state.patientSex}</div>
            </div>
             <div>
              <div>Modality: {state.imgModality}</div>
              <div>SeriesNumber : {state.seriesNumber}</div>
            </div>
          </InfoRowsUp>

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
        </InfoContainer>
      )
    };

    const onElementEnabled = useCallback((enabledEvt) =>{
      const cornerstoneElement = enabledEvt.detail.element;
      // console.log(cornerstoneElement)
      setElement(cornerstoneElement)

      // Wait for image to render, then invert it
      
    },[]);

    useEffect(()=>{
      if(element !== undefined){
        element.addEventListener(
          'cornerstoneimagerendered',
          imageRenderedEvent => {
            const viewport = imageRenderedEvent.detail.viewport;
            const image = imageRenderedEvent.detail.image
            const {byteArray} = image.data;
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


            setState({
                // ...state,
                patientBirth,
                patientSex,
                imgStudyDate,
                seriesNumber,
                stationName,
                protocol,
                imgModality,
                width,
                center,
            });
            cornerstone.setViewport(element, viewport);
          }
        )
        return;
      }
    },[element])


    return (
        <div>
            <h1>Dicom Viewer</h1>
            {/* {console.log(img)} */}
            <input type="file" accept=".dcm" onChange={onChange}/>
            <CornerstoneViewport 
              tools={tools}
              imageIds={img}
              onElementEnabled={elementEnabledEvt => onElementEnabled(elementEnabledEvt)}
              loadingIndicatorComponent={Loader}
              viewportOverlayComponent={Overlay}
              style={{ minWidth: '100%', height: '512px', flex: '1' }}
            />
        </div>
    );
};

export default ViewPresenter;