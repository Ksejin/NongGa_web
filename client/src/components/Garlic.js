import React, { useState, useEffect } from "react";
import LineChart from "react-linechart";
import "../../node_modules/react-linechart/dist/styles.css";
import styled from "styled-components";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Axios from "axios";

export default function Garlic() {
  const [Data, setData] = useState(null);
  useEffect(() => {
      Axios.get("http://localhost:5000/get_data").then((response) => {
          setData(response.data["garlic"]);
          console.log(response.data);
      });
  }, []);
  const priceData = [
    {
      color: "red",
      points: [
        { x: -3, y:  31200},
        { x: -2, y: 31200 },
        { x: -1, y: 31200 },
        { x: 0, y: 31200},
        { x: 1, y: 30745},
        { x: 2, y: 31214 },
        { x: 3, y: 31220 },
      ],
    },
  ];
  return (
    <Center>
      <Wrapper>
        <h1>마늘</h1>
        <LineChart width={1000} height={600} data={priceData} />
      </Wrapper>
      <StyledLink to="/pepper">
        <StyledLeft />
      </StyledLink>

      <StyledLink to="/onion">
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

