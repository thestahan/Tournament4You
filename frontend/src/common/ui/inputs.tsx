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
  width: 100%;
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

export const InputLabel = styled.label`
  color: ${colors.black};
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  margin-bottom: 8px;
`;

export const InputHint = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.black};
  opacity: 0.7;
`;

export const InputLabeled: React.FC<{
  label?: string;
  hint?: string;
  className?: string;
}> = ({ label, hint, children, className }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      marginBottom: "10px",
    }}
    className={className}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {label ? (
        <InputLabel style={{ marginBottom: "0" }}>{label}</InputLabel>
      ) : null}
      {hint ? <InputHint>{hint}</InputHint> : null}
    </div>
    {children}
  </div>
);

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
