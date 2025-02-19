import React from "react";
import LoginBg from "../../assets/Images/Png/loginBg.png";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate("/emailVerification");
  }
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${LoginBg})`, backgroundSize: "cover" }}
        className="fixed inset-0 bg-opacity-50 opacity-15"
      ></div>
      <div className="flex items-center justify-center p-8 min-h-screen relative z-30">
        <div className="bg-white relative  p-8 rounded-3xl shadow-lg w-[500px]">
          <h2 className="text-xl font-semibold text-black text-center">
            Reset Password
          </h2>
          <p className="text-[#00000099] text-center text-base font-normal mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum.
          </p>

          <input
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-3 border rounded-lg mt-6"
          />
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-gradient-to-r from-[#798FFF] to-[#8EC6FF] text-white font-semibold rounded-full"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
