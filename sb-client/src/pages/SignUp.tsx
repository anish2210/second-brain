import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TickMarkIcon } from "../icons/TickMarkIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "../components/background-beams";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>();
  const useremailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const confirmPasswordRef = useRef<HTMLInputElement>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function signup() {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`;
    const username = usernameRef.current?.value;
    const useremail = useremailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      setError("Password do not match!");
      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      return;
    }

    setError(null);

    try {
      await axios.post(url, {
        userName: username,
        userEmail: useremail,
        password,
      });
      alert("You have signed up successfully !");
      navigate("/signin");
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError("User already exists. Please use a different email.");
      } else {
        setError("An error occurred while signing up. Please try again.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-600">
      <BackgroundBeams />
      <div className="bg-green-400 shadow-lg rounded-lg p-8 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign Up
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 mb-6">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={useremailRef} placeholder="Email" />
            <Input
              reference={passwordRef}
              placeholder="Password"
              type="password"
            />
            <Input
              reference={confirmPasswordRef}
              placeholder="Confirm Password"
              type="password"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex justify-center">
          <Button
            variant="primary"
            text="Sign Up"
            loading={false}
            startIcon={<TickMarkIcon size="md" />}
            onClick={signup}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-100">
            Already have an account?{" "}
            <a href="/signin" className="text-green-200 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
