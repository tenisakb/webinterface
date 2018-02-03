import React from "react";

const PrimaryButton = ({ children, onClick }) => (
  <button className="btn btn-primary btn-lg" onClick={onClick}>
    {children}
  </button>
);

export default PrimaryButton;
