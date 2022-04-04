export interface InputInterface {
  label?: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}
