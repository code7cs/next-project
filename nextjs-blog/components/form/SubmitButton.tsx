"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-outline w-full max-w-3xl mt-8 mb-4 text-white"
      type="submit"
      disabled={pending}
    >
      <span className="!text-white">{text}&nbsp;</span>
      {pending ? (
        <i className="fa-solid fa-spinner fa-spin text-white text-xl"></i>
      ) : (
        <i className="fa-regular fa-paper-plane"></i>
      )}
    </button>
  );
};

export default SubmitButton;
