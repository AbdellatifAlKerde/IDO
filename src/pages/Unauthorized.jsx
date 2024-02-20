import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex justify-center items-center flex-col gap-10 text-6xl text-red-900 font-bold min-h-[100vh]">
      Unauthorized
      <Link to="/" className="text-blue-500 underline">
        Back to Login
      </Link>
    </div>
  );
}

export default Unauthorized;
