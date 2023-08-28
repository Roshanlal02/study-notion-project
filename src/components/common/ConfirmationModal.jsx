import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="absolute z-[1000] top-1/2 left-1/2">
      <div className="p-6 bg-richblack-800">
        <p className="text-lg font-semibold mb-2">{modalData.text1}</p>
        <p className="text-base font-medium mb-2">{modalData.text2}</p>
        <div className="flex justify-between">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <IconBtn
            onclick={modalData?.btn2Handler}
            text={modalData?.btn2Text}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
