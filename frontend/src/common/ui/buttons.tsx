import styled from "@emotion/styled";
import { colors } from "../colors";

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
  border-radius: 5px;
  cursor: pointer;

  width: fit-content;
  padding: 10px 30px;
  text-align: center;
  background-color: ${(props: Props) =>
    colors[props.backgroundColor || "darkMaroon"]};
  color: ${(props: Props) => colors[props.color || "white"]};
`;

export const PrimaryButton = styled(StyledButton)`
  transition: 0.3s ease-in-out;
  border: 1px solid ${colors.darkMaroon};

  &:hover {
    background-color: ${colors.white};
    color: ${colors.darkMaroon};
    border: 1px solid ${colors.darkMaroon};
    transform: scale(1.03);
    transition: 0.3s ease-in-out;
  }
`;

export const SecondaryButton = styled(StyledButton)`
  transition: 0.3s ease-in-out;
  border: 1px solid ${colors.dimGray};
  background-color: transparent;
  color: ${colors.dimGray};
  &:hover {
    transform: scale(1.03);
    transition: 0.3s ease-in-out;
  }
`;
