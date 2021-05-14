import React, { useState } from 'react';
import styled from 'styled-components'

const SlideContainer = styled.div`
    margin-left:auto;
    margin-right:auto;
    position:relative;
`
const SlideDiv = styled.div`
    display : ${prop=> prop.visivility};
    flex-direction : row;
    width : 100%;
    height : 300px;
    background-color : black;
    color : white;
    text-align : center;
`;
const SlideContent = styled.div`
    margin : auto;
    line-height : 5;
`;
const SlideImage = styled.img`
    padding : 10px;
    float : left;
    width : 40%;
    height : 100%;
`
const SlideTitle = styled.div`
    font-size: xx-large;
    text-transform: uppercase;
    margin-bottom : 20px;
`;
const ButtonContainer = styled.div`
    text-align:center;
    margin-top:16px;
    margin-bottom:16px;
    font-size:18px;
    color:#fff;
    position:absolute;
    left:50%;
    bottom:0;
    transform:translate(-50%,0%);
    -ms-transform:translate(-50%,0%);
    width:100%;
`
const PrevButton = styled.div`
    cursor:pointer;
    float:left;
    &:hover{
        color : #eee;
    }
`
const NextButton = styled.div`
    cursor:pointer;
    float:right;
    &:hover{
        color : #eee;
    }
`
const Dot = styled.span`
    height:15px;
    width:15px;
    padding:0;
    margin : 0 5px;
    cursor : pointer;
    border-radius:50%;
    text-align:center;
    color:#fff;
    display:inline-block;
    border:1px solid #ccc;
    background-color:${prop=>prop.active ? '#fff' : 'transparent'};
    &: hover {
        color:#000!important;
        background-color:#fff;
    }
`

const SlideItem = (props) => {
    const {src, title, content, visivility} = props;

    return (
        <SlideDiv className="Slide-container" visivility={visivility}>
            <SlideImage  src={src} alt="w3slider"/>
            <SlideContent>
                <SlideTitle>
                    {title}
                </SlideTitle>
                <div>
                    {content}
                </div>
            </SlideContent>
        </SlideDiv>
    )
};

const ButtonBar = (props) => {
    const{slideIndex, slideLen, onNext, onPrev, onCurrent}=props;
    return (
        <ButtonContainer>
            <PrevButton onClick={()=>onPrev(-1)}>&#10094;</PrevButton>
            <NextButton onClick={()=>onNext(1)}>&#10095;</NextButton>
            {
                [...Array(slideLen)].map((_,index)=>(
                    <Dot active={slideIndex===index ? true:false} onClick={()=>onCurrent(index)} key={index}/>
                ))
            }

        </ButtonContainer>
    )
}

const Slideshow = () => {
    const slideitems = [
        {
            src : '/mastang1.jpg',
            title: 'Mustang',
            content:"my dream car"
        },
        {
            src : '/mustang2.jpg',
            title: 'Mustang',
            content:"sdsgdgsdsgsdgsdgsdsdgsgds"
        },
        {
            src : '/mastang3.jpg',
            title: 'Mustang',
            content:"sdgsdgsgdsdfsdfsgsdgsdgsgsdfsd"
        },
    ]
    const [slideIndex, setSlideIndex] = useState(1)
    const showDivs = (idx)=>{
        const index = slideitems.length -1;
        if(-1<idx && idx===index){ 
            setSlideIndex(idx);
        } else if(idx < 0){ 
            setSlideIndex(slideitems.length-1);
        } else if (idx > index){
            setSlideIndex(0)
        } else if (idx < index){
            setSlideIndex(idx)
        }
    };
    const onPrev = ()=> {
        showDivs(slideIndex-1)
    }
    const onNext = ()=> {
        showDivs(slideIndex+1)
    }
    const currentDivs=(idx)=>{
        showDivs(idx)
    }
    

    return (
        <SlideContainer>
            {console.log(slideIndex)}
            {
                slideitems.map((item, ind)=>(
                    <SlideItem key={ind} src={item.src} title={item.title} content={item.content} visivility={ind === slideIndex ? 'block' : 'none'}/>
                ))
            }
            <ButtonBar slideIndex={slideIndex} slideLen={slideitems.length} onPrev={onPrev} onNext={onNext} onCurrent={currentDivs}/>
        </SlideContainer>
    );
};

export default Slideshow;