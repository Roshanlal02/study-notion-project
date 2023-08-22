import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className="text-white flex justify-center items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset Your Password" : "check Your Email"}</h1>
          <p>
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p>Email Address:</p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </label>
            )}
            <button type="submit">
              {!emailSent ? "Reset Password" : "Reset email"}
            </button>
          </form>

          <div>
            <Link to="/login">
              <p>Back To Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
