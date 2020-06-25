import React, { Component } from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";
import styled from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

export default class Onion extends Component {
  render() {
    const data = [
      {
        color: "red",
        points: [
          { x: -3, y: 16000 },
          { x: -2, y: 13500 },
          { x: -1, y: 11200 },
          { x: 0, y: 14500 },
          { x: 1, y: 13200 },
          { x: 2, y: 13100 },
          { x: 3, y: 11300 },
        ],
      },
    ];
    return (
      <Center>
        <Wrapper>
          <h1>양파</h1>
          <LineChart width={1000} height={600} data={data} />
        </Wrapper>
        <StyledLink to="/garlic">
          <StyledLeft />
        </StyledLink>

        <StyledLink to="/pepper">
          <StyledRight />
        </StyledLink>
      </Center>
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