"use client"
import React, {useContext, useState} from 'react'
import EditSlots from './EditSlots'

import { useClinicContext } from '@/context/clinicContext';
function Slot({appointment, index,}) {
    const [selectedStartTime, setSelectedStartTime] = useState(appointment.startTime);
    const [selectedEndTime, setSelectedEndTime] = useState(appointment.endTime);
    const [status, setStatus] = useState(appointment.status);
    const { socket } = useContext(useClinicContext);
    const deleteAppointment = async (id) => {
        const deleteApp = await fetch("/api/appointments/"+id, {
            method: "DELETE"
        });
        const res = await deleteApp.json();
        let roomId = 12
        socket.emit("abc", roomId);
        console.log("deleted", res);
    };
  return (
    <tr className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap px-4 py-4 font-medium">{index+1}</td>
        <td className="whitespace-nowrap px-4 py-4">{appointment.startTime}</td>
        <td className="whitespace-nowrap px-4 py-4">{appointment.endTime}</td>
        <td className="whitespace-nowrap px-4 py-4">{appointment.status}</td>
        {/* <td className="whitespace-nowrap px-4 py-4 "><span> <EditSlots selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} status={status} /></span></td> */}
        <td className="whitespace-nowrap px-4 py-4"><span onClick={()=>deleteAppointment(appointment._id)} className='bg-red-500 px-2 py-1 text-white rounded cursor-pointer'>Delete</span></td>
        <td className="whitespace-nowrap px-4 py-4"><span className='bg-green-500 px-2 py-1 text-white rounded cursor-pointer'>Edit</span></td>

    </tr>
  )
}

export default Slot