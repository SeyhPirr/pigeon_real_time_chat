import React from "react";

function Signup() {
  return (
    <div className="flex flex-col bg-red-400 h-screen	w-screen justify-center items-center justif-center">
      <input
        className="w-1/5 relative bottom-40 rounded mt-2 h-8"
        type="text"
        placeholder="Your username"
      />
      <input
        className="w-1/5 relative bottom-40 rounded mt-2 h-8"
        type="text"
        placeholder="Your email"
      />
      <input
        className="w-1/5 relative bottom-40 rounded mt-2 h-8"
        type="text"
        placeholder="Your password"
      />
    </div>
  );
}

export default Signup;
