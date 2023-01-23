import { NextPage } from "next";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";

interface UserProps {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
interface SignUpMutationResult {
    ok: boolean;
}

const SignUp: NextPage = () => {
    const router = useRouter();
    const [checkbox, setCheckbox] = useState(false); //약관 동의여부 체크
    const [seePassword, setSeePassword] = useState(false); // 비밀번호 see 기능
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false); //비밀번호 재확인 see 기능

    const [signUp, { loading, data, error }] =
        useMutation<SignUpMutationResult>("/api/sign-up"); // 정보 다 입력시 useMutation으로 등록(POST) 요청

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserProps>();

    const userPassword = useRef<string | null>(null); //비밀번호 재확인을 위해 비밀번호 실시간 감지
    userPassword.current = watch("password", "");

    const handleSeePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSeePassword((prev) => !prev);
    };
    const handleSeePasswordConfirm = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        setSeePasswordConfirm((prev) => !prev);
    };
    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckbox(e.target.checked);
    };
    const onVaild = (formData: UserProps) => {
        if (loading) return;
        if (!checkbox) return;
        signUp(formData);
    };
    useEffect(() => {
        if (data?.ok) {
            router.push("/sign-in");
        } //회원가입 성공시 로그인 페이지로 이동
    }, [data, router]);

    return (
        <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
            <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-4 mx-auto px-16 py-8 rounded-lg shadow-2xl">
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
                <form
                    onSubmit={handleSubmit(onVaild)}
                    className="my-6 text-sm w-full space-y-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-gray-700">
                            Name
                        </label>
                        <input
                            {...register("name", {
                                required: "필수 정보입니다.",
                                pattern: {
                                    value: /^[가-힣]{2,7}$/,
                                    message: "이름은 2-7자 이어야합니다",
                                },
                            })}
                            type="text"
                            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            placeholder="홍길동"
                        />
                        <span className="text-red-400 text-xs my-0 p-0 ">
                            {errors.name?.message}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700">
                            Email Address
                        </label>
                        <input
                            {...register("email", {
                                required: "필수 정보입니다.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                                    message: "이메일 형식이 아닙니다.",
                                },
                            })}
                            type="email"
                            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                            placeholder="abc@example.com"
                        />
                        <span className="text-red-400 text-xs my-0 p-0 ">
                            {errors.email?.message}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                {...register("password", {
                                    required: "필수 정보입니다.",
                                    pattern: {
                                        value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                                        message:
                                            "비밀번호는 8-16자 영어 대 소문자, 숫자, 특수문자를 사용하세요",
                                    },
                                })}
                                type={seePassword ? "type" : "password"}
                                className="w-full mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                                placeholder="비밀번호를 입력하세요."
                            />
                            <button
                                onClick={handleSeePassword}
                                className=" mt-2 absolute right-2 bg-transparent  text-gray-700 "
                            >
                                {seePassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                        className="w-5 h-5 transition"
                                    >
                                        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512"
                                        className="w-5 h-5 transition"
                                    >
                                        <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <span className="text-red-400 text-xs my-0 p-0 ">
                            {errors.password?.message}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="password_confirmation"
                            className="text-gray-700"
                        >
                            Password Confirmation
                        </label>
                        <div className="relative flex items-center">
                            <input
                                {...register("passwordConfirm", {
                                    required: "필수 정보입니다.",
                                    validate: (value) =>
                                        value === userPassword.current ||
                                        "비밀번호가 일치하지 않습니다.",
                                })}
                                type={seePasswordConfirm ? "text" : "password"}
                                className="mt-2 p-2 border w-full border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                                placeholder="비밀번호를 재입력하세요."
                            />
                            <button
                                onClick={handleSeePasswordConfirm}
                                className="mt-2 absolute right-2 bg-transparent  text-gray-700 "
                            >
                                {seePasswordConfirm ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 640 512"
                                        className="w-5 h-5"
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
                        <span className="text-red-400 text-xs my-0 p-0 ">
                            {errors.passwordConfirm?.message}
                        </span>
                    </div>
                    <div className="flex items-center justify-end mb-2">
                        <input
                            type="checkbox"
                            onChange={handleCheckbox}
                            id="remember_me"
                            className="mr-2 focus:ring-0 rounded"
                        />
                        <label className="text-gray-700" htmlFor="remember_me">
                            I accept the{" "}
                            <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                terms
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                privacy policy
                            </a>
                        </label>
                    </div>
                    <button className="text-lg text-white w-full mt-2 p-2 border focus:outline-none bg-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:border-blue-300  hover:border-blue-300 rounded-lg ">
                        Register
                    </button>
                </form>
                <div className="flex items-center justify-between">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="text-sm mx-6 text-gray-400">OR</span>
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
    );
};

export default SignUp;
