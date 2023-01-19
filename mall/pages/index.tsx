import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Index: NextPage = () => {
    const [seePassword, setSeePassword] = useState(false);
    // const handleSeePassword = (event:)=>{
    //     eve
    // }
    return (
        <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
            <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
                <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                    Sign Up
                </h2>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Already have an account?{" "}
                    <Link
                        href="./sign-in"
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Sign in here
                    </Link>
                </p>
                <form className="my-8 text-sm w-full">
                    <div className="flex flex-col my-4">
                        <label htmlFor="name" className="text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="flex flex-col my-4">
                        <label htmlFor="email" className="text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col my-4">
                        <label htmlFor="password" className="text-gray-700">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type="password"
                                className="w-full mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                                placeholder="Enter your password"
                            />
                            <button
                                onClick={() => {
                                    setSeePassword((prev) => !prev);
                                    event.preventDefault(),
                                }}
                                className="absolute right-2 bg-transparent  text-gray-700"
                            >
                                {seePassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                    >
                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        className="w-5 h-5"
                                    >
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col my-4">
                        <label
                            htmlFor="password_confirmation"
                            className="text-gray-700"
                        >
                            Password Confirmation
                        </label>
                        <input
                            type="password"
                            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            placeholder="Enter your password again"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Index;
