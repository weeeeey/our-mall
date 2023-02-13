import { NextPage } from "next";
// import { useSession, signIn, signOut } from "next-auth/react";

const Index: NextPage = () => {
    return (
        <>
            <nav className="bg-white px-2 py-3 fixed w-full z-20 top-0 left-0 border-b border-gray-200 ">
                <div className="flex items-center justify-between  mx-auto">
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center"
                    >
                        <span className="text-xl font-semibold whitespace-nowrap">
                            Weeeeey&#39;s shop
                        </span>
                    </a>
                    <div className="w-full flex ">
                        <ul className="mx-auto flex p-4 border-gray-100 space-x-4 mt-0 text-sm font-medium border-0 bg-white ">
                            <li>
                                <a
                                    href="#"
                                    className="py-2 px-3 text-gray-700 hover:bg-gray-100 font-semibold border-b border-black "
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className=" py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 "
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className=" py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 "
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className=" py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex md:order-2">
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Index;

// const Index: NextPage = () => {
//     const { data: session } = useSession();
//     if (session) {
//         return (
//             <>
//                 Signed in as {session.user.name} <br />
//                 <button onClick={() => signOut()}>Sign out</button>
//             </>
//         );
//     }
//     return (
//         <>
//             Not signed in <br />
//             <button onClick={() => signIn()}>Sign in</button>
//         </>
//     );
// };
