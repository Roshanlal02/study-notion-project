import React, { useState, useEffect } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      //setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="lable-style">
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="form-style w-full bg-richblack-700 text-richblack-5 p-[12px] rounded-[0.5rem]"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50 pt-2"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5 gap-2">
              <span>{requirement}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pure-greys-800 bg-yellow-50 p-1 rounded-xl"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && <span>{label} is required</span>}
    </div>
  );
};

export default RequirementField;
