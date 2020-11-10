import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
`;

interface Props{
    onClick?:()=>void
}
const BackDrop:React.FunctionComponent<Props> = (props)=>(
    <Container onClick={props.onClick}/>
);
export default BackDrop;