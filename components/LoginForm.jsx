"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
  <div className="dropdown-header" onClick={toggleDropdown}>
    Not Registered? <span className="underline">Register</span>
    <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
  </div>
  {isOpen && (
    <div className="dropdown-content bg-blue-500 w-48 text-white p-2 text-base rounded-sm ml-10 absolute mt-2">
      <div className="dropdown-option mb-2">
        <a href={"/doctor"}>Register as a doctor</a>
      </div>
      <div className="dropdown-option">
        <a href={"/patient"}>Register as a patient</a>
      </div>
    </div>
  )}
</div>
  );
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="grid place-items-center h-screen"
      style={{ backgroundImage: 'url("https://e1.pxfuel.com/desktop-wallpaper/764/142/desktop-wallpaper-clinic.jpg")', backgroundSize: 'cover' }}
    >
      <div className="w-full max-w-xl">
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login
          </h2>
          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Log In
              </button>
            </div>

            <Dropdown />
          </form>
        </div>
      </div>
    </div>
  );
}

