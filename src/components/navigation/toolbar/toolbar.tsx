import React from 'react';
import styled from 'styled-components';
import Logo from '../../logo/logo';
import Nav from './nav/nav';
const Container = styled.div`
    height: 56px;
    background-color: brown;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 90;
`;
const Hider = styled.div`
    height: 100%;
    @media (max-width: 499px){
        display: none;
    }
`;
const Menu = styled.div`
    @media (min-width: 500px){
        display: none;
    }
`;
const Padding = styled.div`
    height: 100%;
    padding: 6px;
`;
interface Props{
    onMenuClick?:()=>void
}
const Toolbar:React.FunctionComponent<Props> = ({onMenuClick})=>{
    return (
        <Container>
            <Menu onClick={onMenuClick}>Menu</Menu>
            <Padding>
                <Logo/>
            </Padding>
            <Hider>
                <Nav/>
            </Hider>
        </Container>
    );
}
export default Toolbar;