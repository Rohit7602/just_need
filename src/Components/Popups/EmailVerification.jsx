import React, { useState, useRef } from "react";
import LoginBg from "../../assets/Images/Png/loginBg.png";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const handleVerifyOtp = () => {
    navigate("/createPassword");
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if value is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: "cover" }}
        className="fixed inset-0 bg-opacity-50 opacity-15"
      ></div>
      <div className="flex items-center justify-center p-8 min-h-screen relative z-30">
        <div className="bg-white p-8 rounded-3xl shadow-lg w-[500px]">
          <h2 className="text-xl font-semibold text-black text-center">
            Email Verification
          </h2>

          <p className="text-[#00000099] text-center text-base font-normal mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum.
          </p>
          <div className="flex justify-center mt-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                placeholder="-"
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                className="h-12 w-9 border rounded-xl text-center text-xl ml-4"
              />
            ))}
          </div>
          <p className="text-[#00000099] text-center text-base font-normal mt-4">
            Don’t Receive any code?{" "}
            <span className="text-clr-blue border-b-2 border-clr-blue">
              Resend code
            </span>
          </p>
          <button
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#798FFF] to-[#8EC6FF] text-white font-semibold rounded-full"
            onClick={handleVerifyOtp}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
