import React from 'react';
import styled from 'styled-components';
import Logo from '../../logo/logo';
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
const Padding = styled.div`
    height: 100%;
    padding: 6px;
`;
const Toolbar:React.FunctionComponent<{}> = (props)=>{
    return (
        <Container>
            <div>Menu</div>
            <Padding>
                <Logo/>
            </Padding>
            <nav>Nav</nav>
        </Container>
    );
}
export default Toolbar;