"use client";

import React, { useState, useEffect, useContext } from 'react';
import Slot from './Slot';
import { useClinicContext } from '@/context/clinicContext';
import { useSession } from 'next-auth/react';
import { TimePicker } from 'antd';
import moment from "moment";

const Slots = () => {
    const { data: session } = useSession();
    const { socket } = useContext(useClinicContext);
    const [slots, setSlots] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleStartTimeChange = (time, timeString) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time, timeString) => {
        setEndTime(time);
    };

    const handleAddSlot = async () => {
        console.log(moment(startTime.$d).format('HH:mm'))
        const res = await fetch("/api/appointments", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                startTime: moment(startTime.$d).format('HH:mm'),
                endTime: moment(endTime.$d).format('HH:mm'),
                doctorId: session.user.loggedUser._id
            })
        })
        const data = await res.json()
        console.log(data)
        let roomId = 12
        socket.emit("abc", roomId);
        getSlots(); 
        setIsOpen(false);
    };

    const getSlots = async () => {
        try {
            const response = await fetch(`/api/appointments/${session.user.loggedUser._id}`);
            const slotsData = await response.json();
            console.log(slotsData.data);
            setSlots(slotsData.data);
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };

    useEffect(() => {
        getSlots();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("refetch", (roomId) => {
                getSlots();
            });
        }
    }, [socket]);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r mb-4 from-blue-900 to-blue-900 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
                Add Slot
            </button>

            {isOpen && (
    <div
        onClick={(e) => e.stopPropagation()}
        className="text-white bg-blue-900 p-6 rounded-sm justify-center text-center w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
    >
        <div className="flex flex-col items-start justify-start">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col items-start">
                    <p>Start Time</p>
                    <TimePicker
                        onChange={handleStartTimeChange}
                        value={startTime}
                        format="HH:mm"
                        className="custom-time-picker-style"
                    />
                </div>
                <div className="flex flex-col items-start ml-4">
                    <p>End Time</p>
                    <TimePicker
                        onChange={handleEndTimeChange}
                        value={endTime}
                        format="HH:mm"
                        className="custom-time-picker-style"
                    />
                </div>
                <button
                    onClick={handleAddSlot}
                    className="bg-white hover:opacity-90 transition-opacity text-blue-900 font-semibold py-2 rounded"
                >
                    Add Slot
                </button>
            </div>
        </div>
    </div>
)}





            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="text-2xl text-blue-900 font-extrabold mb-3">Booked Slots</div>
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b bg-blue-900 text-white border-blue-600 font-medium dark:border-blue-500">
                                    <tr>
                                        <th scope="col" className="px-4 py-4">Index</th>
                                        <th scope="col" className="px-4 py-4">Start Time</th>
                                        <th scope="col" className="px-4 py-4">End Time</th>
                                        <th scope="col" className="px-4 py-4">Status</th>
                                        <th scope="col" className="px-4 py-4">Action</th>
                                        <th scope="col" className="px-4 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="border-blue-900 border-2">
                                    {slots?.length === 0 && <div></div>}
                                    {slots?.map((app, i) => <Slot key={app._id} index={i} appointment={app} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slots;
