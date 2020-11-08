import styled from "styled-components";

const OrderButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: orange;
    margin: auto;
    outline: none;
    &:hover{
        cursor: pointer;
    }
    &:active{
        transform: scale(0.9);
    }
    &:disabled{
        background-color: #fad693;
        cursor: not-allowed;
    }
`;

export default OrderButton;