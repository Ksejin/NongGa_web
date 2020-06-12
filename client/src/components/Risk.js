import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import red from "../images/red.png";
import orange from "../images/orange.png";
import green from "../images/green.png";
import Axios from "axios";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Header = styled.div``;

const ContentsContainer = styled.div``;

const ContentsArea = styled.div``;

// const input_data = [
//     { index: 0, temperature: 1, rainfall: 0, daylight: 2 },
//     { index: 1, temperature: 2, rainfall: 0, daylight: 2 },
//     { index: 2, temperature: 2, rainfall: 0, daylight: 2 },
//     { index: 3, temperature: 2, rainfall: 0, daylight: 2 },
// ];

function item_mapping(row) {
    switch (row) {
        case 0:
            return (row = green);

        case 1:
            return (row = orange);

        case 2:
            return (row = red);

        default:
            break;
    }

    console.log(row);
    return row;
}

function item_name(row) {
    switch (row) {
        case 0:
            return (row = "고추");

        case 1:
            return (row = "배추와 무");

        case 2:
            return (row = "양파");

        case 3:
            return (row = "마늘");

        default:
            break;
    }

    console.log(row);
    return row;
}

function TableData({ Data }) {
    return (
        <React.Fragment>
            {Data &&
                Data.map((item) => (
                    <tr key={item.index}>
                        <td>{item_name(item.index)}</td>
                        <td>
                            <img src={item_mapping(item.temperature)} />
                        </td>
                        <td>
                            <img src={item_mapping(item.rainfall)} />
                        </td>
                        <td>
                            <img src={item_mapping(item.daylight)} />
                        </td>
                    </tr>
                ))}
        </React.Fragment>
    );
}

export default function Risk() {
    const [Data, setData] = useState([null]);
    useEffect(() => {
        Axios.get("http://localhost:5000").then((response) => {
            setData(response.data);
        });
    }, []);

    return (
        <Container>
            <Header>
                <p>
                    농산물 주산지 날씨데이터를 이용한 농산물 위험도 분석입니다.
                </p>
                <p>안정 - 초록, 주의 - 주황, 위험 - 빨강으로 표시됩니다.</p>
                <p>고추 - 안동, 배추와 무 - 고창, 양파 - 신안, 마늘 - 의성</p>
            </Header>

            <ContentsContainer>
                <ContentsArea>
                    <p>6월 12일</p>
                </ContentsArea>
            </ContentsContainer>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>기온</th>
                        <th>강수량</th>
                        <th>일조시간</th>
                    </tr>
                </thead>
                <tbody>
                    <TableData data={Data} />
                </tbody>
            </Table>
        </Container>
    );
}