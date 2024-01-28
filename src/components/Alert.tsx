import React, { useState } from 'react';
type AlertProps = {
  message: string;
  type: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Alert = ({ message, type,show,setShow}:AlertProps) => {

  const baseStyle = 'border px-4 py-3 rounded relative';
  let alertStyle;

  switch (type) {
    case 'success':
      alertStyle = 'bg-green-500 border-green-700 text-white';
      break;
    case 'error':
      alertStyle = 'bg-red-500 border-red-700 text-white';
      break;
    default:
      alertStyle = 'bg-yellow-500 border-yellow-700 text-white';
  }

  if (!show) return null;

  return (
    <div className={`${baseStyle} ${alertStyle} sm:text-sm md:text-base lg:text-lg`}>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={() => setShow(false)}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"></path></svg>
      </span>
    </div>
  );
};

export default Alert;