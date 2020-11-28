import styled from "styled-components";

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
`;
export default BackDrop;