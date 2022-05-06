import styled from "@emotion/styled";
import React from "react";
import { useState } from "react";
import { colors } from "common/colors";
export interface InputInterface {
  label?: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  id?: string;
  name?: string;
  incorrect?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export const Container = styled.div`
  display: flex;
`;

export const StyledInput = styled.input<{ incorrect?: boolean }>`
  border: none;
  border-bottom: 1px solid black;
  padding: 10px 5px 10px 0px;
  width: 200px;
  background-color: ${colors.whiteSmoke};
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: ${colors.salmon};
    color: ${colors.salmon};

    &::placeholder {
      color: ${colors.salmon};
    }
  }
`;

export const Icon = styled.i`
  right: 0;
  position: relative;
  margin-left: -20px;
  margin-top: 10px;
  cursor: pointer;
`;

export const PasswordInput: React.FC<InputInterface> = ({
  label,
  value,
  setValue,
  id,
  name,
  incorrect,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Container>
      <StyledInput
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={label}
        style={{
          paddingRight: "25px",
        }}
        value={value}
        onChange={setValue}
        onBlur={onBlur}
        incorrect={incorrect}
      />
      <Icon
        className={showPassword ? "pi pi-eye mr-2" : "pi pi-eye-slash mr-2"}
        onClick={() => setShowPassword(!showPassword)}
      ></Icon>
    </Container>
  );
};
