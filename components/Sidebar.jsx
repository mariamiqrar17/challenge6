"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";


const Sidebar = () => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    if (!session) router.push("/")
    return (
        <div>
            
            <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-max lg:w-64 sm:w-44 h-screen transition-transform ${isOpen ? "translate-x-0 " : "bg-blue-900 -translate-x-full"} sm:translate-x-0`} aria-label="Sidebar">

                <span className="text-2xl sm:hidden absolute right-0 mr-1 top-2 cursor-pointer" onClick={() => setIsOpen(false)}><RxCross2 /></span>
                <div className="h-full px-3 py-4 overflow-y-auto bg-blue-900 text-white">
                    <ul className="space-y-2 font-medium">
                    {session && (
                    <li>
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 hover:text-blue-900 dark:hover:bg-gray-700 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                                />
                            </svg>
                            <span className="ms-3">Dashboard</span>
                        </Link>
                    </li>
                        )}
                        {!session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/doctor-table" onClick={() => setIsOpen(false)} className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-blue-900 dark:hover:bg-gray-700 group">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap">Doctors</span>
                            </Link>
                        </li>}
                        {session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/slots" onClick={() => setIsOpen(false)} className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-blue-900 dark:hover:bg-gray-700 group">
                                <span className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white hover:text-blue-900">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                                 </svg>

                                </span>
                                <span className="flex-1 ms-3 whitespace-nowrap">Slots</span>
                            </Link>
                        </li>}
                        {session?.user?.loggedUser?.isDoctor && <li>
                            <Link href="/appointments" onClick={() => setIsOpen(false)} className="flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 hover:text-blue-900 dark:hover:bg-gray-700 group">
                                <span className=" text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white hover:text-blue-900">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                </svg>

                                </span>
                                <span className="flex-1 ms-3 whitespace-nowrap">Appointments</span>
                            </Link>
                        </li>}
                        <li className="mt-20">
                            <a href="#" className="flex mt-96 items-center p-2 rounded-lg bg-red-600 dark:text-white hover:bg-gray-100 hover:text-blue-900 dark:hover:bg-gray-700 group">
                                <span className="text-gray-500 transition duration-75  dark:text-gray-400 group-hover:text-gray-900 hover:text-blue-900 dark:group-hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white hover:text-blue-900">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>

                                </span>
                                <span className="flex-1 ms-3 whitespace-nowrap" onClick={() => { signOut(); router.push("/") }}>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 ">
            <style jsx global>
                {`
                    #default-sidebar {
                        background-color: #1e40af;
                    }
                `}
            </style>
            </div>
        </div>)
};
export default Sidebar;