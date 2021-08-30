import React from 'react';
import html2canvas from 'html2canvas';
import styled from 'styled-components';

const Div = styled.div`
	margin : auto;
	padding : 30px;
	font-size : xx-large;
	background-color : #006888;
	color : white;
    margin : 20px;
`;

const HtmlToPng = () => {
    const onCapture = () => {
        console.log('onCapture');
        // html2canvas(document.getElementById('div')).then(canvas => {
        //     onSavaAs(canvas.toDataURL('image/png', 'image-download.png')
        // })
        html2canvas(document.getElementById('div')).then(canvas => {
            onSaveAs(canvas.toDataURL('image/png'), 'image-download.png')
        })
    };

    const onSaveAs = (uri, filename) => {
        console.log('onSaveAs');
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = uri;
        link.download = filename;
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Div id="div">
                Hello #006888!
                <div>
                    Hello html2canvas!
                </div>
            </Div>
            <button onClick={onCapture}>click</button>
            <textarea style={{ resize: 'none' }} />
        </>
    );

};

export default HtmlToPng;
