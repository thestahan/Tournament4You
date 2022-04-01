import styled from "@emotion/styled";
import colors from "../colors";

type Props = {
  color?: keyof typeof colors;
  backgroundColor?: keyof typeof colors;
};

export const StyledButton = styled.button<Props>`
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  text-transform: none;
  -webkit-appearance: button;
  overflow: visible;
  border: none;
  cursor: pointer;

  width: fit-content;
  padding: 10px 30px;
  text-align: center;
  background-color: ${(props: Props) =>
    colors[props.backgroundColor || "white"]};
  color: ${(props: Props) => colors[props.color || "black"]};
`;

export const Button = styled(StyledButton)`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? colors[backgroundColor] : "white"};
`;

export const SecondaryButton = () => {
  return <div></div>;
};

export const RadioButton = () => {
  return <div></div>;
};
