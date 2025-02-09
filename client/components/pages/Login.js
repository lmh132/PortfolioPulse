import { LoginForm } from "../auth/LoginForm";
import { SignupForm } from "../auth/SignupForm";
import { useState } from "react";
export const Login = () => {
  const [signIn, setSignIn] = useState(true);
  return <div>{signIn ? <LoginForm /> : <SignupForm>Sign Up</SignupForm>}</div>;
};
