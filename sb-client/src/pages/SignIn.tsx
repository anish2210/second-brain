import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TickMarkIcon } from "../icons/TickMarkIcon";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../components/background-beams";

export function SignIn() {


  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function signin() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(url, {
      userName:username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard")
    window.location.reload();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-600">
          <BackgroundBeams/>
      <div className="bg-green-400 shadow-lg rounded-lg p-8 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign In
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 mb-6">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" type="password" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={signin}
            variant="primary"
            text="Sign In"
            startIcon={<TickMarkIcon size="md" />}
            loading = {false}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-100">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-200 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
