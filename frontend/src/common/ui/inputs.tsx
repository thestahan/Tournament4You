import styled from "@emotion/styled";
import React from "react";

export const Input = styled.input<{ incorrect?: boolean }>`
  border: 1px solid black;
  border-radius: 2px;
  padding: 10px 5px;
`;

export const InputLabel = styled.div``;

export const LabeledInput: React.FC<{ label?: string }> = ({ label }) => (
  <div>
    <InputLabel>{label}</InputLabel>
    <Input />
  </div>
);
