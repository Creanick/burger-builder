import React from 'react';
import styled from 'styled-components';
import BackDrop from '../backdrop/backdrop';

const Modal:React.FunctionComponent<{show?:boolean}> = ({show = true,children})=>{
    return (
        <Wrapper show={show}>
            <BackDrop/>
            <Container>{children}</Container>
        </Wrapper>
    );
}
const Wrapper = styled.div<{show:boolean}>`
    visibility: ${props=>props.show ? "visible":"hidden"};
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