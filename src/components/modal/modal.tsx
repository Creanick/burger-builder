import React from 'react';
import styled from 'styled-components';

const Modal:React.FunctionComponent<{}> = (props)=>{
    return (
        <Wrapper>
            <BackDrop/>
            <Container>{props.children}</Container>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
`;
const Container = styled.div`
    padding: 20px 20px;
    background: white;
    border-radius: 4px;
    position: absolute;
    width: 70%;
    @media (min-width: 600px){
        width: 500px;
    }
`;

export default Modal;