import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <>
      <div className="fixed justify-center flex items-center z-50 w-full overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%-1rem)] max-h-full text-white">
        <div class="relative w-full max-w-md max-h-full">
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
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ConfirmationModal;
