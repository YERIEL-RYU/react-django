import React, { useEffect, useState } from 'react';
import ViewPresenter from './ViewPresenter';
import axios from 'axios';

const ViewContainer = () => {
    const BASE_URL = 'localhost:8000/'
    const [img, setImg] = useState(["dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm"])
    const [imgID , setimgID] = useState()
    const onChange=(e)=>{
        const file = e.target.files[0]
        console.log(file)
        const dicom = new FormData();
        dicom.append('dicom', file)
        // axios.post('http://localhost:8000/dicom/',dicom)
        // .then(res=>{
        //     var path = 'dicomweb://localhost:8000'
        //     path += res.data.dicom
        //     setImg([path])
        //     setimgID(res.data.id)
        // })
        var test = URL.createObjectURL(file)
        console.log(test)
        test = 'dicomweb:' + test
        console.log(test)
        setImg([test])
    }

    return (
        <ViewPresenter onChange={onChange} img={img} imgID={imgID}/>
    );
};

export default ViewContainer;