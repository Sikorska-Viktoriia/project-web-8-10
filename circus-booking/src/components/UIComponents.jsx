// src/components/UIComponents.jsx
import React from "react";

export const Input = (props) => <input {...props} />;
export const Button = ({ children, ...rest }) => <button {...rest}>{children}</button>;
