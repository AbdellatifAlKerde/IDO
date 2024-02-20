import React from "react";

function Input(props) {
  return (
    <div>
      <label className={`block text-sm font-thin ${props.labelColor}`}>
        {props.label}
      </label>
      <input
        className="bg-gray-50 border border-[#e0e0e0] text-sm rounded-[5px] block w-full p-2.5"
        {...props}
      />
    </div>
  );
}

export default Input;
