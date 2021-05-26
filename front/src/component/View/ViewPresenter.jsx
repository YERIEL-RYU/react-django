import React from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import CornerstoneViewport from 'react-cornerstone-viewport'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneBase64ImageLoader from 'cornerstone-base64-image-loader';
import cornerstoneMath from 'cornerstone-math';
import dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';
const ViewPresenter = (props) => {
    const {onChange, img} = props;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init();

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone;
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
      ];
    return (
        <div>
            <h1>Dicom Viewer</h1>
            {console.log(img)}
            
            <input type="file" accept=".dcm" onChange={onChange}/>
            <CornerstoneViewport 
                imageIds={img}
                tools={tools}
                style={{ minWidth: '100%', height: '512px', flex: '1' }}
            />
        </div>
    );
};

export default ViewPresenter;