export interface IInputProps  {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    input: string;
    setInput: (value: string) => void;
  };