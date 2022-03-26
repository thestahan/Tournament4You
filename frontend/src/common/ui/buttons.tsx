import styled from "@emotion/styled";
import colors from "../colors";

type Props = {
  color?: keyof typeof colors;
  backgroundColor?: keyof typeof colors;
};

export const Button = styled.div<Props>`
  width: fit-content;
  padding: 10px 5px;
  text-align: center;
  background-color: ${(props: Props) =>
    colors[props.backgroundColor || "white"]};
  color: ${(props: Props) => colors[props.color || "black"]};
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? colors[backgroundColor] : "white"};
`;

export const SecondaryButton = () => {
  return <div></div>;
};

export const RadioButton = () => {
  return <div></div>;
};

// export default PrimaryButton;
