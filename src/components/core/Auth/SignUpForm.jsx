import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "../../common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { setSignupData } from "../../../slices/authSlice";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const handleSubmit = () => {
    
  }

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleSubmit}>

      </form>
    </div>
  );
};

export default SignUpForm;
