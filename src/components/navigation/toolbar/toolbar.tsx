import React from 'react';
import styled from 'styled-components';
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
const Toolbar:React.FunctionComponent<{}> = (props)=>{
    return (
        <Container>
            <div>Menu</div>
            <div>Logo</div>
            <nav>Nav</nav>
        </Container>
    );
}
export default Toolbar;