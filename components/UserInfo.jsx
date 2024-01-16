// UserInfo.jsx

"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';

export default function UserInfo() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState({ totalDoctors: 0, totalPatients: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total doctors
        const doctorsResponse = await fetch('/api/doctor');
        const doctorsData = await doctorsResponse.json();
        const totalDoctors = doctorsData.data.length;

        // Fetch total patients
        const patientsResponse = await fetch('/api/patient');
        const patientsData = await patientsResponse.json();
        const totalPatients = patientsData.data.length;

        // Set counts
        setCounts({ totalDoctors, totalPatients });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid place-items-center h-screen">
      <div className="grid place-items-center w-full mt-4">
        <div className="p-8 bg-zince-300/10 flex flex-col gap-4 my-0">
          <div className="flex gap-4">
            <div className="bg-blue-500 text-white p-4 text-center rounded-md h-36 w-64">
              <h3 className="text-2xl font-bold mb-5">Total Doctors</h3>
              <p className="text-3xl">{counts.totalDoctors}</p>
            </div>

            <div className="bg-green-500 text-white text-center p-4 rounded-md h-36 w-64">
              <h3 className="text-2xl font-bold mb-5">Total Patients</h3>
              <p className="text-3xl">{counts.totalPatients}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-4">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
