import React, { Fragment } from 'react';
import styled from 'styled-components';
import Logo from '../logo/logo';
import Nav from '../navigation/toolbar/nav/nav';

const Wrapper = styled.div<{show?:boolean}>`
    position: fixed;
    left: 0;
    top:0;
    width: 280px;
    max-width: 70%;
    height: 100%;
    background-color: white;
    z-index: 200;
    padding: 16px;
    transition: transform 0.3s ease-in;
    transform: ${props=>props.show?"translateX(0)":"translateX(-100%)"};
    @media (min-width: 500px){
        display: none;
    }
`;
const BackDrop = styled.div<{show?:boolean}>`
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    display: ${props=>props.show?"block":"none"};
    @media (min-width: 500px){
        display: none;
    }
`;
interface SideDrawerProps{
    show?: boolean;
    onBackClick?:()=>void
}
const SideDrawer:React.FunctionComponent<SideDrawerProps> = ({show=false,onBackClick})=>(
    <Fragment>
        <BackDrop show={show} onClick={onBackClick}/>
        <Wrapper show={show}>
            <div style={{height: "6%"}}>
            <Logo/>
            </div>
            <br/>
            <Nav/>
        </Wrapper>
    </Fragment>
);

export default SideDrawer;