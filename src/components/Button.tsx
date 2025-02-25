import React from 'react';

const Button = ({ onClick, children }: { onClick: () => void,children: React.ReactNode }) => {


 

  return (
    <button
     onClick={onClick}
      className="px-8 py-4 text-2xl bg-blue-500 text-white hover:bg-green-700 font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
};

export default Button;
