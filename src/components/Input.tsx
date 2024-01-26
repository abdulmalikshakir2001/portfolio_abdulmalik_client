'use client'

function Input({type,name,id,placeholder,input,setInput}) {

  return (
    <input
      type={type}
      name={name}
      id={id}
      autoComplete={name}
      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full"
      placeholder={placeholder}
      value={input}
      onChange={(e)=> setInput(e.target.value)}
    />
  );
}
export default Input;
