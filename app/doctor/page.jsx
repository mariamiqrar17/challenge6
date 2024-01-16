"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function DoctorForm (){
  const bgImage = 'url("https://e1.pxfuel.com/desktop-wallpaper/764/142/desktop-wallpaper-clinic.jpg")';
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [valueDoc, setValue] = useState({
        name: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        specialz: "",
        qualification: "",
        experience: 0,
        amount: 0,
        address: "",
        isDoctor:true
    })
    const onSaveDoctorProfile = async e => {
        e.preventDefault();
        console.log(valueDoc)
        if(valueDoc.address.trim() === "" || valueDoc.name.trim() === "" || valueDoc.email.trim() === "" || valueDoc.password.trim() === "" || valueDoc.age.trim() === "" || valueDoc.qualification.trim() === "" || valueDoc.specialz.trim() === "" || valueDoc.gender.trim() === "" || valueDoc.experience.trim() === "" || valueDoc.amount.trim() === ""){
            return alert("Invalid credentials entered!")
        };
        setLoading(true);
        const data = await fetch("/api/register/doctor", {
            method: "POST",
            body: JSON.stringify({
                name: valueDoc.name,
                email:valueDoc.email,
                password: valueDoc.password,
                age: valueDoc.age,
                gender: valueDoc.gender,
                specialization: valueDoc.specialz,
                amount: valueDoc.experience,
                qualification: valueDoc.qualification,
                exp: valueDoc.experience,
                address: valueDoc.address,
                isDoctor:valueDoc.isDoctor
            })
        });
        const resp = await data.json();
        setLoading(false);
        router.push("/");
        console.log(resp)
    };
    const onClear = () => {
        setValue({
            name: "",
            email: "",
            password: "",
            age: 0,
            gender: "",
            specialz: "",
            qualification: "",
            experience: 0,
            amount: 0,
            address: "",
            isDoctor:false
        });
        router.push("/");
    };
    const onChangeState = event => {
        const { name, value } = event.target;
         setValue({
            ...valueDoc,
        [name]: value
        });
    };
    return(
    <>
    <div
      style={{ backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}
    >
    <form className="sm:w-1/2 mx-auto  px-4 xl:w-[700px] border bg-blue-900 border-gray-300 p-6 rounded-md" onSubmit={onSaveDoctorProfile}>
    <div className="space-y-6 ">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">Doctor's Profile</h2>  
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-white ">Name</label>
          <input onChange={onChangeState} name="name" type="text" placeholder="John Doe" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" value={valueDoc.name} />
        </div>
  
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
          <input onChange={onChangeState} id="email" name="email" type="email" placeholder="john@gmail.com" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" value={valueDoc.email} />
        </div>
  
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
          <input value={valueDoc.password} onChange={onChangeState} id="password" placeholder="Password" name="password" type="password" autoComplete="password" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
  
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-white">Gender</label>
          <select value={valueDoc.gender} onChange={onChangeState} id="gender" name="gender" autoComplete="gender" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
  
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-white">Age</label>
          <input value={valueDoc.age} onChange={onChangeState} type="number" min="20" name="age" placeholder="Age" id="age" autoComplete="age" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
  
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-white">Specialization</label>
          <input value={valueDoc.specialization} onChange={onChangeState} type="text" placeholder="e.g heart surgeon" name="specialization" id="specialization" autoComplete="specialization" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
  
        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-white">Qualification</label>
          <input value={valueDoc.qualification} onChange={onChangeState} type="text" placeholder="e.g MBBS" name="qualification" id="qualification" autoComplete="qualification" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
  
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-white">Experience</label>
          <input value={valueDoc.experience} onChange={onChangeState} type="number" placeholder="Experience in years" min="1" name="experience" id="experience" autoComplete="experience" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
  
        <div>
          <label htmlFor="consultancyFees" className="block text-sm font-medium text-white">Consultancy Fees (Pkr)</label>
          <input value={valueDoc.consultancyFees} onChange={onChangeState} type="number" placeholder="Fee" name="consultancyFees" id="consultancyFees" autoComplete="consultancyFees" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
  
        <div className="sm:col-span-2">
          <label htmlFor="clinicAddress" className="block text-sm font-medium text-white">Clinic Address</label>
          <input value={valueDoc.clinicAddress} onChange={onChangeState} type="text" placeholder="Address" name="clinicAddress" id="clinicAddress" autoComplete="clinicAddress" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-transparent required" />
        </div>
      </div>
    </div>
  
    <div className="mt-6 flex items-center justify-end">
      <button onClick={onClear} type="button" className="text-sm font-semibold text-white mr-4">Cancel</button>
      <button type="submit" className="rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex justify-center" disabled={loading}>
        Save {loading && <div className="lds-dual-ring ml-2"></div>}
      </button>
    </div>
  </form>
  </div>
  </>
    ) 
};
