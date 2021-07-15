import React, { useCallback, useEffect, useState } from 'react';
import ViewPresenter from './ViewPresenter';
import axios from 'axios';

// cornerstone module
import cornerstone from 'cornerstone-core';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneFileImageLoader from 'cornerstone-file-image-loader';
import cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import cornerstoneMath from 'cornerstone-math';
import * as dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';

const ViewContainer = () => {
  const BASE_URL = 'localhost:8000/'
  const [img, setImg] = useState()
  const [viewer2, setViewer2] = useState()
  const [uploaded, setUploaded] = useState(false)
  const [state, setState] = useState({});

  const onChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    // const dicom = new FormData();
    // dicom.append('dicom', file)
    // axios.post('http://localhost:8000/dicom/',dicom)
    // .then(res=>{
    //     var path = 'http://localhost:8000'
    //     path += res.data.path
    //     console.log(path)
    //     setUploaded(true)
    //     setViewer2(path)
    // })
    var fileUrl = URL.createObjectURL(file)
    console.log(fileUrl)
    fileUrl = 'wadouri:' + fileUrl
    console.log(fileUrl)
    setImg(fileUrl)
  }
  const onChangePng = (e) => {
    // const file = e.target.files[0]
    // var fileUrl = URL.createObjectURL(file)
    // console.log(fileUrl)
    // fileUrl = 'wadouri:' + fileUrl
    // console.log(fileUrl)
    setViewer2('http://localhost:8000/media/ArtBoard.png/')
  }



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
  useEffect(() => {
    const elements = [document.getElementById('viewer'), document.getElementById('deeplearning-viewer')];
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
    cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 2 });
  }, [WwwcTool, ZoomTool])

  /**
   * local viewer setting
   */
  useEffect(() => {
    const element = document.getElementById('viewer');
    cornerstone.enable(element);

    if (img !== undefined) {

      cornerstone
        .loadImage(img)
        .then(image => {
          const { byteArray } = image.data;
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
          cornerstone.setMaximumSizeBytes(element)
          console.log(viewport.displayedArea)
          viewport.displayedArea.rowPixelSpacing = 1;
          viewport.displayedArea.columnPixelSpacing = 1;
          console.log(viewport.displayedArea)
        });
    }
  }, [img])

  /**
   * server viewer setting
   */
  useEffect(() => {
    const element = document.getElementById('deeplearning-viewer');
    cornerstone.enable(element);
    if (viewer2 !== undefined) {

      const layers = [
        {
          imageId: img,
          option: {
            name: 'Dicom'
          }
        },
        {
          imageId: viewer2,
          option: {
            name: 'PNG',
            opacity: 0.2,
            viewport: {
              colormap: 'hotIron',
              voi: {
                windowWidth: 30,
                windowCenter: 16
              }
            }
          }
        },
      ]
      console.log(layers);
      function loadImages() {
        const promises = [];

        layers.forEach(function (layer) {
          console.log(layer)
          const loadPromise = cornerstone.loadAndCacheImage(layer.imageId);
          promises.push(loadPromise);
        });

        return Promise.all(promises);
      };

      loadImages().then(function (images) {
        images.forEach(function (image, index) {
          const layer = layers[index];
          const layerId = cornerstone.addLayer(element, image, layer.options);

          cornerstone.updateImage(element);
          console.log('Layer ' + index + ': ' + layerId);
        });
      })


      // cornerstone
      // .loadImage(viewer2)
      // .then(image => {
      //     console.log(image)
      //     cornerstone.displayImage(element, image);
      // });
    }
  }, [viewer2, img])

  return (
    <ViewPresenter
      onChange={onChange}
      img={img}
      uploaded={uploaded}
      viewer2={viewer2}
      state={state}
      onChangePng={onChangePng}
    />
  );
};

export default ViewContainer;