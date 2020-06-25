import React, { Component } from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";
import styled from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default class Pepper extends Component {
  render() {
    const data = [
      {
        color: "green",
        points: [
          { x: -3, y: 14500 },
          { x: -2, y: 12500 },
          { x: -1, y: 14200 },
          { x: 0, y:  12000},
          { x: 1, y: 11900 },
          { x: 2, y: 13600 },
          { x: 3, y: 14300 },
        ],
      },
    ];
    return (
      <Center>
        <Wrapper>
          <h1>고추</h1>
          <LineChart width={1000} height={600} data={data} />
        </Wrapper>
        <StyledLink to="/onion">
          <StyledLeft />
        </StyledLink>

        <StyledLink to="/garlic">
          <StyledRight />
        </StyledLink>      </Center>
    );
  }
}
const Center = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  display: block;
  margin-top: 100px;
`;

const StyledLeft = styled(FaArrowAltCircleLeft)`
  width:150px;
  height:150px;
`;

const StyledRight = styled(FaArrowAltCircleRight)`
  margin-left: 100px;
  width:150px;
  height:150px;
`;


const StyledLink = styled(Link)`
    text-decoration: none;
`;

