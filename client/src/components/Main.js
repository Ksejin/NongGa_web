import React from "react";
import styled from "styled-components";
import nong from "../images/nong.png";
import { Link } from "react-router-dom";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const MainHeader = styled.div`
    background-image: url(${nong});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    margin-top: 100px;
    width: 500px;
    height: 300px;
`;

const MainContentContainer = styled.div`
    display: flex;
    /* background: blue; */
    width: 100%;
    height: 37vh;
    margin-top: 150px;
    align-items: center;
    justify-content: space-evenly;
`;

const PageButton = styled.div`
    width: 340px;
    height: 120px;

    background: #74b9ff;
    box-shadow: 5px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    text-align: center;
    line-height: 2.9;
    font-size: 2.5rem;
    vertical-align: middle;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

export default function Main() {
    return (
        <Container>
            <MainHeader></MainHeader>
            <MainContentContainer>
                <StyledLink to="/onion">
                    <PageButton>농산물가격예측</PageButton>
                </StyledLink>
                {/* <StyledLink to="/risk">
                    <PageButton>농산물위험도분석</PageButton>
                </StyledLink> */}
            </MainContentContainer>
        </Container>
    );
}
