import { styled } from 'styled-components';

export const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 20px;
`;

export const DropdownHeader = styled.div`
  width: 30%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #007bff;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  width: 30%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  z-index: 1000;
  align-items: start;
`;

export const Option = styled.div`
  padding: 10px;
  font-size: 16px;
  background: white;
  display: flex;
  color: black;
  align-items: flex-start;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`;
export const StatusContainer = styled.div`
  margin-top: 36px;
  display: flex;
  float: right;
  right: 60px;
  position: relative;
  margin: 20px;
`;
