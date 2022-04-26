import styled from "@emotion/styled";

export const ValidationMessage = styled.p<{ isDisapearing?: boolean }>`
  color: red;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  border-radius: 2px;
  padding: 5px;
  background-color: #ffdada;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
