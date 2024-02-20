import React, { useState } from "react";
import MainButton from "./MainButton";

function Popup(props) {
  return (
    <>
      <div
        onClick={props.onClickOutsideClose}
        className="fixed z-10 top-0 left-0 w-[100%] h-[100vh] bg-overlay"
      ></div>
      <div className="bg-white p-8 z-20 absolute inset-0 m-auto h-[600px] w-[450px] rounded-[6px]">
        <div className="flex justify-center items-center text-4xl font-bold mb-4">
          <h2>Add Task</h2>
        </div>
        <div
          onClick={props.onClickClose}
          className="absolute top-2 right-4 text-4xl cursor-pointer rotate-45"
        >
          +
        </div>
        <form {...props}>{props.children}</form>
      </div>
    </>
  );
}

export default Popup;
