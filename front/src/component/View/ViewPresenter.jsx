import React, { useEffect, useState } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import CornerstoneViewport from 'react-cornerstone-viewport'
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneBase64ImageLoader from 'cornerstone-base64-image-loader';
import cornerstoneMath from 'cornerstone-math';
import dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';
class CustomLoader extends React.Component {
  render() {
    return (
      <div
        className="lds-ripple"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          color: 'white',
        }}
      >
        <div>이미지를 업로드하세요</div>
      </div>
    );
  }
}

const CutomOverlay = (props) => {
  return (
    <div style={{position: 'absolute',
    top: '15px',
    left: '15px',
    width: '100%',
    height: '100%',
    color: 'white',}}>
            <p>
              <b>BOB</b>: <span style={{ color: 'dodgerblue' }}>{props.patientId}</span>
            </p>
    </div>
  )
}
const ViewPresenter = (props) => {
    const {onChange, img} = props;
    const [test, setTest] = useState('')
    const [state, setState]= useState('')
    const element = document.getElementById('test-view');
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init();

    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    cornerstoneBase64ImageLoader.external.cornerstone = cornerstone;

    // if(img !== undefined){
    //   cornerstone.loadAndCacheImage(img).then(function(image) {
    //     cornerstone.displayImage(element, image);
      
    //   });
    // }
    const onImageRendered = (e) => {
      const eventData = e.detail;
      console.log(e)
      cornerstone.setToPixelCoordinateSystem(eventData.enabledElement, eventData.canvasContext);
      const context = eventData.canvasContext;
        context.beginPath();
        context.strokeStyle = 'white';
        context.lineWidth = .5;
        context.rect(128, 90, 50, 60);
        context.stroke();
        context.fillStyle = "white";
        context.font = "6px Arial";
        context.fillText("Tumor Here", 128, 85);
    }
    
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
    
    // useEffect(()=>{
    //   if(img.length !== 0){
    //     cornerstone
    //             .loadImage(img[0])
    //             .then(image=>{
    //               const {byteArray} = image.data;
    //               const dataSet = dicomParser.parseDicom(byteArray);
    //               console.log(dataSet.string('x00100030'))
    //               setTest(dataSet.string('x00100030'))

    //             })
    //   }
    // },[img])
    
    const onElementEnabled=(Evt=>{
      const cornerstoneElement = Evt.detail.element;
      setState(cornerstoneElement)
      cornerstoneElement.addEventListener('cornerstoneimagerendered',
      imageRenderedEvent => {
        const viewport = imageRenderedEvent.detail.viewport;
        // cornerstone.setToPixelCoordinateSystem(imageRenderedEvent.detail.enabledElement, imageRenderedEvent.detail.canvasContext);
        // const context = imageRenderedEvent.detail.canvasContext;
        // context.beginPath();
        // context.strokeStyle = 'white';
        // context.lineWidth = .5;
        // context.rect(128, 90, 50, 60);
        // context.stroke();
        // context.fillStyle = "white";
        // context.font = "6px Arial";
        // context.fillText("Tumor Here", 128, 85);
        cornerstone.setViewport(cornerstoneElement, viewport);
      })
    })
    return (
        <div>
            <h1>Dicom Viewer</h1>
            {console.log(img)}
            
            <input type="file" accept=".dcm" onChange={onChange}/>
            <CornerstoneViewport 
              tools={tools}
              imageIds={img}
              // viewportOverlayComponent={CutomOverlay}
              onElementEnabled={elementEnabledEvt => {
                const cornerstoneElement = elementEnabledEvt.detail.element;

                console.log(elementEnabledEvt)
            
                // Save this for later
                // setState(cornerstoneElement);
            
                // Wait for image to render, then invert it
                // cornerstoneElement.addEventListener(
                //   'cornerstoneimagerendered',
                //   imageRenderedEvent => {
                //     const viewport = imageRenderedEvent.detail.viewport;
            
                //     cornerstone.setViewport(cornerstoneElement, viewport);
                //   }
                // );
              }}
              style={{ minWidth: '100%', height: '512px', flex: '1' }}
              id='test-view'
              loadingIndicatorComponent={CustomLoader}

            />
        </div>
    );
};

export default ViewPresenter;