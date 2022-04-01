import styled from "@emotion/styled";
import React from "react";
import { InputInterface } from "common/models";
import { useState } from "react";

export const Container = styled.div`
  display: flex;
`;

export const StyledInput = styled.input<{ incorrect?: boolean }>`
  border: none;
  border-bottom: 1px solid black;
  padding: 10px 5px 10px 0px;
  position: relative;
  width: 200px;

  &:focus {
    outline: none;
  }
`;

export const Icon = styled.i`
  right: 0;
  position: relative;
  margin-left: -20px;
  margin-top: 10px;
  cursor: pointer;
`;

export const Input: React.FC<InputInterface> = ({ label, value, setValue }) => {
  return (
    <Container>
      <StyledInput
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Container>
  );
};

export const PasswordInput: React.FC<InputInterface> = ({
  label,
  value,
  setValue,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Container>
      <StyledInput
        type={showPassword ? "text" : "password"}
        placeholder={label}
        style={{
          paddingRight: "25px",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Icon
        className="pi pi-eye mr-2"
        onClick={() => setShowPassword(!showPassword)}
      ></Icon>
    </Container>
  );
};
