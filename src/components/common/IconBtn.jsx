import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) => {
  return (
    <button disabled={disabled} onClick={onclick}>
      {children ? (
        <>
          <span>{text}</span> {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
