'use client'

import { IInputProps } from "@/interfaces/IInputProps";

function InputBorderBottom({type,name,id,placeholder,input,setInput}:IInputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={name}
      className="w-full p-2 border-x-0 border-t-0 bg-transparent border-b-2  border-gray-500 focus:border-sky-400 focus:border-x-0   text-white  focus:ring-0"
      placeholder={placeholder}
      value={input}
      onChange={(e)=> setInput(e.target.value)}
    />
  );
}
export default InputBorderBottom;
