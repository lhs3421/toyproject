import styled from "styled-components";

// 1. axios로 데이터 받기

// 페이지네이션 API 주소
// https://node-pagnation.herokuapp.com/users

// 2. 데이터를 우선적으로 한번에 받아서 state에 저장
// 3. 데이터 갯수에 따라 페이지 버튼 생성
// 4. 데이터 전체 갯수 파악하기
// 5. 10개씩 뿌려줄 경우 10 나누기 전체갯수 올림해서 페이지 버튼 만들기
// 6. 1번 클릭시 10개씩 그려주기

const Wrapper = styled.div`
  height: 100%;
  background-color: #f5f6f8;
`;

const Title = styled.h1`
  font-size: 5em;
  font-weight: bold;
  color: black;
  text-align: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
  height: 90vh;
  margin: 0 10%;
`;

const PageWrapper = styled.div`
  position: absolute;
  bottom: 1px;
  margin: 1em 20em;
`;

// 버튼 만들때 주석 풀고 쓰세용

// const Button = styled.button`
//   width: 30px;
// `;

function Pagination() {
  return (
    <Wrapper>
      <Title>Pagination</Title>
      <GridWrapper>여기에 사람들 이름을 띄우세용</GridWrapper>
      <PageWrapper>여기에 페이지 번호를 띄우세용</PageWrapper>
    </Wrapper>
  );
}

export default Pagination;
