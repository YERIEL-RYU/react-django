import React, { useEffect, useState } from 'react';
import ViewPresenter from './ViewPresenter';
import axios from 'axios';

const ViewContainer = () => {
    const [img, setImg] = useState([])
    const [imgID , setimgID] = useState(0)
    const onChange=(e)=>{
        const file = e.target.files[0]
        console.log(file)
        const dicom = new FormData();
        dicom.append('dicom', file)
        axios.post('http://localhost:8000/dicom/',dicom)
        .then(res=>{
            var path = 'http://localhost:8000'
            path += res.data.dicom
            setImg([path])
            setimgID(res.data.id)
        })
    }
    return (
        <ViewPresenter onChange={onChange} img={img}/>
    );
};

export default ViewContainer;