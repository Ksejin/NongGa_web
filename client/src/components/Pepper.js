import React, { useState, useEffect } from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";
import styled from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Pepper() {
  const [Data, setData] = useState(null);
  useEffect(() => {
      Axios.get("http://localhost:5000/get_data").then((response) => {
          setData(response.data["pepper"]);
          console.log(response.data);
      });
  }, []);
  const priceData = [
    {
      color: "red",
      points: [
        { x: -3, y: 57400},
        { x: -2, y: 56800 },
        { x: -1, y: 55400 },
        { x: 0, y: 53000},
        { x: 1, y: 61944},
        { x: 2, y: 59710 },
        { x: 3, y: 62152 },
      ],
    },
  ];
  return (
    <Center>
      <Wrapper>
        <h1>고추</h1>
        <LineChart width={1000} height={600} data={priceData} />
      </Wrapper>
      <StyledLink to="/onion">
        <StyledLeft />
      </StyledLink>

      <StyledLink to="/garlic">
        <StyledRight />
      </StyledLink>      </Center>
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

