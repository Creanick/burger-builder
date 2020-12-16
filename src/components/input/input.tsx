import styled from "styled-components";

const Input = styled.input<{isValid?:boolean}>`
    width: 60%;
    display: block;
    margin: auto;
    padding: 10px 12px;
    margin: 10px auto;
    border: 1px solid black;
    border-color:${props=>props.isValid ? "black":"red"};
    color:${props=>props.isValid ? "black":"red"};
    outline: none;
`;
export default Input;