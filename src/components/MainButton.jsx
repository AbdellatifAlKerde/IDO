import React from "react";

function MainButton(props) {
  return (
    <button
      {...props}
      className="font-bold text-[#403564] rounded-[20px] bg-[#B6A3C2] w-full py-1 hover:opacity-75"
    >
      {props.label}
    </button>
  );
}

export default MainButton;
