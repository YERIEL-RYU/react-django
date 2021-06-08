import React, { useEffect, useState } from 'react';
import ViewPresenter from './ViewPresenter';
import axios from 'axios';

const ViewContainer = () => {
    const BASE_URL = 'localhost:8000/'
    const [img, setImg] = useState([])
    const [viewer2, setViewer2] = useState()
    const [uploaded, setUploaded] = useState(false)
    const onChange=(e)=>{
        const file = e.target.files[0]
        console.log(file)
        const dicom = new FormData();
        dicom.append('dicom', file)
        axios.post('http://localhost:8000/dicom/',dicom)
        .then(res=>{
            var path = 'http://localhost:8000'
            path += res.data.path
            console.log(path)
            setUploaded(true)
            setViewer2(path)
        })
        var fileUrl = URL.createObjectURL(file)
        console.log(fileUrl)
        fileUrl = 'wadouri:' + fileUrl
        console.log(fileUrl)
        setImg([fileUrl])
    }

    return (
        <ViewPresenter onChange={onChange} img={img} uploaded={uploaded} viewer2={viewer2}/>
    );
};

export default ViewContainer;