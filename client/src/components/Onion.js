import React, { useState, useEffect } from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";
import styled from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Axios from "axios";
var points = [];

export default function Onion() {
  // const [Data, setData] = useState([]);
  // useEffect(() => {
  //     Axios.get("http://localhost:5000/get_data").then((response) => {
  //         points.push({ x: -3, y: response.data["onion"][0]});
  //         points.push({ x: -2, y: response.data["onion"][1]});
  //         points.push({ x: -1, y: response.data["onion"][2]});
  //         points.push({ x: 0, y: response.data["onion"][3]});
  //         points.push({ x: 1, y: response.data["onion"][4]});
  //         points.push({ x: 2, y: response.data["onion"][5]});
  //         points.push({ x: 3, y: response.data["onion"][6]});
  //       });
  //     }, []);
  // console.log(points);
  const priceData = [
    {
      color: "red",
      points: [
        { x: -3, y:  13800},
        { x: -2, y: 14000 },
        { x: -1, y: 13600 },
        { x: 0, y: 13200},
        { x: 1, y: 14687},
        { x: 2, y: 14494 },
        { x: 3, y: 14962 },
      ],
    },
  ];
  console.log(priceData);

  return (
    <Center>
      <Wrapper>
        <h1>양파</h1>
        <LineChart width={1000} height={600} data={priceData} />
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