export interface InputInterface {
  label?: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  id?: string;
  name?: string;
  incorrect?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
