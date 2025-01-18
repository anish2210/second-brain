import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { TickMarkIcon } from "../icons/TickMarkIcon";

export function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <div className="flex justify-center">
          <div className="flex flex-col gap-4 mb-6">
            <Input placeholder="User Name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="primary"
            text="Sign Up"
            startIcon={<TickMarkIcon size="md" />}
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
