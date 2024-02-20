import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import man from "../assets/man.png";
import woman from "../assets/woman.png";
import logo from "../assets/idoLogo.png";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Sign in Successfully");
      const oneHour = 1 * 60 * 60 * 1000;
      Cookies.set("user-token", data.token, { expires: oneHour });
      localStorage.setItem("userid", JSON.stringify(data.userId));
      localStorage.setItem("userEmail", JSON.stringify(data.email));
      navigate("/home");
    },
    onError: () => {
      toast.error("Failed to login, please check email or password.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAsync({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-[100vh]">
      <div className="w-[50%] relative">
        <img
          className="absolute inset-0 m-auto"
          src={logo}
          alt="man"
          width="300px"
        />
        <img
          className="absolute bottom-0 right-0"
          src={man}
          alt="man"
          width="300px"
        />
        <img
          className="absolute bottom-0 left-0"
          src={woman}
          alt="man"
          width="110px"
        />
      </div>
      <div className="flex justify-center items-center w-[50%] bg-bg-gradient">
        <div className="flex justify-start flex-col">
          <h2 className="text-white text-[72px] font-thin mb-6">
            Time to Work!
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <Input
              labelColor="text-white"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              labelColor="text-white"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div>
              <MainButton
                type="submit"
                disabled={isPending}
                label={isPending ? "Logging in..." : "LOG IN"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
