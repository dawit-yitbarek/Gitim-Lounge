import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import CompleteProfile from "../components/CompleteProfile";
import ForgetPassword from "../components/ForgetPassword";

export default function Auth() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const type = queryParams.get("type");
  const [isSignIn, setIsSignIn] = useState(true);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false)
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (type === "signup") {
      setIsSignIn(false)
    }
  }, [type])

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setSignUpSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#10214b] flex items-center justify-center px-4 py-12">
      {!signUpSuccess && isSignIn && !forgetPassword && <SignIn toggleForm={toggleForm} forgetPassword={(value) => setForgetPassword(value)}/>}
      {!signUpSuccess && !isSignIn && !forgetPassword && <SignUp toggleForm={toggleForm} signUpSuccess={(value) => setSignUpSuccess(value)} setUserName={(value) => setUserName(value)} />}
      {signUpSuccess && !forgetPassword && <CompleteProfile userName={userName} />}
      {forgetPassword && !signUpSuccess && <ForgetPassword />}
    </div>
  );
};