"use client"
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { useClinicContext } from '@/context/clinicContext';

const AppointmentList = ({ appointment, index, }) => {
  const { socket } = useContext(useClinicContext);
  const { data: session } = useSession();
  const oncheckedReservation = async () => {
    const data = await fetch("/api/register/doctor/" + session?.user?.loggedUser?._id, {
      method: "PUT",
      body: JSON.stringify({ appointmentId: appointment._id })
    })
    if (data.status === 200) {
    }
    const resp = data.json()
    console.log(resp)
  };



  return (
    <tr class="bg-blue-900 text-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {appointment?.Patients[0].name}
      </th>
      <td class="px-6 py-4">{appointment.startTime}</td>
      <td class="px-6 py-4">{appointment.endTime}</td>

      <td class="px-6 py-4 space-x-2">
        
        <span>{appointment.status}</span>
      </td>
    </tr>
  );
};

export default AppointmentList;
