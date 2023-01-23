import { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

interface LoginProps {
    email: string;
    password: string;
}

const SignUp: NextPage = () => {
    const { register, handleSubmit } = useForm<LoginProps>();

    const onVaild = async (form: LoginProps) => {
        const email = form.email;
        const password = form.password;

        // signIn이 [...nextAuth.ts]에 정의된 Provider를 호출하는 함수.
        // 그 중에서도 따옴표 사이에 적힌 ID값에 해당하는 Provider를 호출함
        const response = await signIn("email-password-credential", {
            email,
            password,
            redirect: false,
            // redirect false로 인해 callback URL로 이동안함
        });
        console.log(response);
    };
    return (
        <>
            <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center ">
                <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-4 mx-auto px-16 py-4 rounded-lg shadow-2xl">
                    <div className="w-full bg-white  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6">
                            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your account
                            </h1>
                            <p className="text-center text-sm font-light text-gray-500 ">
                                Don&#39;t have an account yet?{" "}
                                <Link
                                    href="/sign-up"
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Sign Up
                                </Link>
                            </p>
                            <form
                                onSubmit={handleSubmit(onVaild)}
                                className="my-6 text-sm w-full space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-gray-900 "
                                    >
                                        Your email
                                    </label>
                                    <input
                                        {...register("email", {
                                            required: true,
                                        })}
                                        type="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                        placeholder="이메일"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        Password
                                    </label>
                                    <input
                                        {...register("password", {
                                            required: true,
                                        })}
                                        type="password"
                                        placeholder="비밀번호"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 "
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-blue-600 text-sm font-medium text-primary-600 hover:underline "
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button className="text-lg text-white w-full mt-2 p-2 border focus:outline-none bg-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:border-blue-300  hover:border-blue-300 rounded-lg ">
                                    Login
                                </button>
                            </form>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="w-full h-[1px] bg-gray-300"></div>
                            <span className="text-sm mx-6 text-gray-400">
                                OR
                            </span>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                        </div>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 326667 333333"
                                    shapeRendering="geometricPrecision"
                                    textRendering="geometricPrecision"
                                    imageRendering="optimizeQuality"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                >
                                    <path
                                        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                                        fill="#4285f4"
                                    ></path>
                                    <path
                                        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                                        fill="#34a853"
                                    ></path>
                                    <path
                                        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                                        fill="#fbbc04"
                                    ></path>
                                    <path
                                        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                                        fill="#ea4335"
                                    ></path>
                                </svg>
                                <span>Sign up with Google</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 124.8 123.36"
                                >
                                    <defs>
                                        <clipPath
                                            id="clip-path"
                                            transform="translate(0.69 0.51)"
                                        >
                                            <path
                                                className="cls-1"
                                                d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"
                                            ></path>
                                        </clipPath>
                                        <clipPath
                                            id="clip-path-2"
                                            transform="translate(0.69 0.51)"
                                        >
                                            <rect
                                                className="cls-2"
                                                width="122.88"
                                                height="122.31"
                                            ></rect>
                                        </clipPath>
                                    </defs>
                                    <g className="cls-3">
                                        <g className="cls-4">
                                            <image
                                                width="260"
                                                height="257"
                                                transform="matrix(0.48, 0, 0, -0.48, 0, 123.36)"
                                                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAAEBCAYAAACexdu5AAAACXBIWXMAABcRAAAXEQHKJvM/AAAEFUlEQVR4Xu3dwXEdIRBFUb4kZ+HwHJbDcxrSeAG+hctVJgDO2cyG9aumoYfX8zzP68evAdzr+fl9jDHG22EdcJGPMcZ4vV6ndcAFPubn+f8q4Aq2DEBmhWDLAAxbBmCzAkGFAKgQgM3qIRxWAVdwygBkVQhyAdBUBDZKAyCaikBmIDxfh2XADda0o50DUFNRhQBoKgIbgQBEIABx7AhEhQBEIACZW4a398My4AYqBCACAYhZBiCrh6BQAFQIwGZOO55WAVewVwDin4pAVlNRIACaisDG689ANBWBeLkJyOoheP0Z8Bw8sNFUBKJCAKKbCEQgAHHsCGQ99npaBtxAaQDEsSMQ045ANBWBqBCAKA2AeA4eiAoBiEAAIhCA6CEAUSEAWcNNcgEwywBs3FQEYpYBiAoByHr9WYUAqBCAzXqXwSkD4KEWYOPqMhDHjkBsGYCYZQCyjh1VCEAXk3QVAT0EYCMQgDh2BLIqBLMMQBXC+2EZcAPTjkD0EICsm4qnZcANlAZAjD8D0VQEoqkIxNVlIEoDIJqKQOY9hNMq4AoqBCB6CEDWL9RMOwIqBGDjbUcgq6noYhJglgHYaCoCWRXC52EZcIP1xyRNRaAK4bAKuIKry0D8IAWIl5uAqBCA+IUakFUh6CoCph2BzbqHYMsAuIcAbGwZgPhBChAVApA17XhaBtxAhQBEIAARCEAEAhCzDEBMOwKxZQAiEIAYbgJilgGILQOQOctwWgVcQQ8BiC0DkPUcvFwA+smql5sALzcBG8NNQGwZgKx/KtoyAO4hABulARBNRSCaikDcQwCiqQjElgHIqhDeD8uAG6xfqKkQADcVgY2mIhBNRSCaikBWhfB5WAbcwCwDEMcLQNax42kZcAMVAhCBAMTFJCDr5Sb3EAA3FYHNPGVQIQBDUxHYuLoMRFMRiKYiEBUCEBeTgDhlADLvIZxWAVfwgxQgtgxANBWBzED4clMR7vZtjOEeArBxUxGIHgIQ/0MAYvwZGLUTD6uAi8xY0EQAhqYisHEPAYimIjDGmEWB8Wcgxp+BOHYEoqkIRFMRGH82C7YMQAw3AfkYY4zH/xDgcnOzoEIAYpYBiKYiEIEAxJYBiAoBiGlHILYMQPxTEYiXm4Dx103F8aa3CDhlADa2DMCwZQD+oUIAxt/jz/9dCNzCb9iBaB4AEQhAzDIAUSEAEQhAnDIAUSEAcTEJiFMGIAIByBpuOqwCrqBCACIQgNgyAFEhAHExCYhAADJvKtoyAEOFAGwEAhCBAEQgAHEPAYgKAYhAACIQgAgEIAIBiEAAIhCACAQgAgGIQAAiEIAIBCACAYhAACIQgAgEIAIBiEAAIhCACAQgAgGIQAAiEIAIBCACAYhAACIQgAgEIAIBiEAAIhCA/AafC2PbZ0osjAAAAABJRU5ErkJggg=="
                                            ></image>
                                        </g>
                                    </g>
                                    <path
                                        className="cls-5"
                                        d="M85.36,78.92l2.72-17.76H71V49.63c0-4.86,2.38-9.59,10-9.59H88.8V24.92a94.45,94.45,0,0,0-13.75-1.2c-14,0-23.21,8.5-23.21,23.9V61.16H36.24V78.92h15.6v43.57H71V78.92Z"
                                        transform="translate(0.69 0.51)"
                                    ></path>
                                </svg>
                                <span>Sign up with Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
