import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 400px;
  margin-left: 60px;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  width: 130px;
  height: 40px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #ddd;
  box-shadow: 1px 1px 3px #888888;

  :hover {
    background-color: #eee;
  }
`;

export const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  margin-left: 60px;
`;

export const SubTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  margin-left: 60px;
`;
