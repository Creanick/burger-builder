import styled from 'styled-components';

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: ${props=>props.color || 'grey'};
    outline: none;
    &:hover{
        cursor: pointer;
    }
    &:active{
        transform: scale(0.9);
    }
    &:disabled{
        background-color: lightgrey;
        cursor: not-allowed;
    }
`;


export default Button;