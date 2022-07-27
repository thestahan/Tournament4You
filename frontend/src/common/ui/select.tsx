import styled from "@emotion/styled";
import { Position } from "players/players";

type Props = {
  name: string;
  onBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  value: any;
  /**
   * To change
   */
  options: Position[];
};

const StyledSelect = styled.select`
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
`;

const SyledOption = styled.option`
  &:hover {
    background-color: red;
  }
`;

export const Select = ({
  name,
  onBlur,
  handleChange,
  value,
  options,
}: Props) => {
  return (
    <StyledSelect
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={handleChange}
    >
      {options.map((option: Position) => (
        <SyledOption key={option.id} value={option.id} label={option.name}>
          {option.name}
        </SyledOption>
      ))}
    </StyledSelect>
  );
};
