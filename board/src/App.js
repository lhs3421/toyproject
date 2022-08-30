import React, { useState, useEffect } from "react";
import WriteModal from "./components/WriteModal";
import "react-quill/dist/quill.snow.css";
import "antd/dist/antd.css";
import { Button as AntButton, Table } from "antd";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  font-size: 3em;
`;

const Wrapper = styled.div`
  height: 60vh;
  background-color: ghostwhite;
`;

const Button = styled(AntButton)`
  display: block;
  margin: 0 auto;
  margin-bottom: 1em;
`;

// const dataSource = [
//   {
//     key: "1",
//     writer: "Mike",
//     content: 32,
//     data: "10 Downing Street",
//     edit: 32,
//   },
// ];

function App() {
  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "No",
    },
    {
      title: "작성자",
      dataIndex: "writer",
      key: "writer",
    },
    {
      title: "내용",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "작성 일자",
      dataIndex: "data",
      key: "date",
    },
    {
      title: "수정",
      dataIndex: "edit",
      key: "edit",
      render: () => <Button>수정</Button>,
    },
    {
      title: "삭제",
      dataIndex: "delete",
      key: "delete",
      render: () => <Button onClick={deleteFn}>삭제</Button>,
    },
  ];

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const deleteFn = () => {
    setDataSource("");
    console.log(dataSource);
  };

  function openModal() {
    setIsOpen(true);
  }

  console.log(dataSource.length);

  return (
    <>
      <Title>Board</Title>
      <Button size="large" onClick={openModal}>
        글쓰기
      </Button>
      <WriteModal
        setIsOpen={setIsOpen}
        modalIsOpen={modalIsOpen}
        setDataSource={setDataSource}
        dataSource={dataSource}
      />
      <Wrapper>
        <Table dataSource={dataSource} columns={columns} />;
      </Wrapper>
    </>
  );
}

export default App;
