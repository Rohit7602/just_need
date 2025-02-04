import React, { useState } from "react";
import { EmailIcon, LockIcon, UnseenIcon } from "../../assets/icon/Icon";
import { useAuthContext } from "../../store/authContext";
import { useNavigate } from "react-router-dom";

function LoginPupUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithEmail } = useAuthContext();
  
  const navigate = useNavigate()

  const handleLogIn = () => {
    signInWithEmail(email, password)
      .then((response) => {
        if (response.success) {
          console.log(response.response); // Corrected from response.data
          localStorage.setItem("logIn","true");
          navigate("/dashboard")
        } else {
          console.error(response.response); // Corrected from response.error
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 h-[443px] w-[545px] m-auto">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-5 relative">
          <div>
            <p className="text-[#1D1617] font-semibold text-[28px]">
              Log In Now
            </p>
            <p className="text-base font-normal mt-4 text-[#00000099] leading-[22px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard{" "}
            </p>
            <div className="flex items-center p-4 border-[1px] border-[#ADA4A54D] rounded-[10px] mt-8">
              <EmailIcon />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="border-[none] outline-none ps-3 w-full"
              />
            </div>
            <div className="flex items-center p-4 border-[1px] border-[#ADA4A54D] rounded-[10px] mt-8">
              <LockIcon />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="border-[none] outline-none px-3 w-full"
              />
              <UnseenIcon />
            </div>
            <div className="text-end">
              <button className="text-sm font-normal text-[#FF0000] mt-2 ">
                Forgot Password?
              </button>
            </div>
            <button
              onClick={handleLogIn}
              className="w-full px-6 py-3 bg-[#6C4DEF] rounded-[40px] text-white mt-12"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPupUp;
