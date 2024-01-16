"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientForm() {
  const bgImage = 'url("https://e1.pxfuel.com/desktop-wallpaper/764/142/desktop-wallpaper-clinic.jpg")';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [valueDoc, setValue] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
    gender: "male",
  });

  const onSavePatientProfile = async (e) => {
    e.preventDefault();
    if (
      valueDoc.name.trim() === "" ||
      valueDoc.email.trim() === "" ||
      valueDoc.password.trim() === "" ||
      valueDoc.age.trim() === "" ||
      valueDoc.gender.trim() === ""
    ) {
      return alert("Invalid credentials entered!");
    }
    setLoading(true);
    const data = await fetch("/api/register/patient", {
      method: "POST",
      body: JSON.stringify({
        name: valueDoc.name,
        email: valueDoc.email,
        password: valueDoc.password,
        age: valueDoc.age,
        gender: valueDoc.gender,
      }),
    });
    const resp = await data.json();
    setLoading(false);
    router.push("/");
    console.log(resp);
  };

  const onClear = () => {
    setValue({
      name: "",
      email: "",
      password: "",
      age: 0,
      gender: "male",
    });
    router.push("/choice");
  };

  const onChangeState = (event) => {
    const { name, value } = event.target;
    setValue({
      ...valueDoc,
      [name]: value,
    });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className="w-full max-w-md p-6 bg-blue-900 rounded-lg shadow-md" onSubmit={onSavePatientProfile}>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Patient Profile</h2>
          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              onChange={onChangeState}
              name="name"
              type="text"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-indigo-500"
              value={valueDoc.name}
              placeholder="John Doe"
            />

            <label htmlFor="email"  className="block text-sm font-medium text-white">
              Email address
            </label>
            <input
              onChange={onChangeState}
              id="email"
              placeholder="John@gmail.com"
              name="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-indigo-500"
              value={valueDoc.email}
            />

            <label htmlFor="password"  className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              value={valueDoc.password}
              onChange={onChangeState}
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-indigo-500"
            />

            <label htmlFor="gender" className="block text-sm font-medium text-white">
              Gender
            </label>
            <select
              value={valueDoc.gender}
              onChange={onChangeState}
              id="gender"
              name="gender"
              autoComplete="gender"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="age" className="block text-sm font-medium text-white">
              Age
            </label>
            <input
              value={valueDoc.age}
              onChange={onChangeState}
              placeholder="Age"
              type="number"
              min="10"
              name="age"
              id="age"
              autoComplete="age"
              className="w-full px-4 py-2 border rounded-md text-gray-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button onClick={onClear} type="button" className="mx-2 text-sm font-semibold text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-700"
              disabled={loading}
            >
              Save {loading && <div className="lds-dual-ring ml-2"></div>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
