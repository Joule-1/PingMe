import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Logo,
    MailIcon,
    PasswordIcon,
    GoogleIcon,
    AppleIcon,
    HidePasswordIcon,
    ShowPasswordIcon,
    NameIcon,
} from "../assets";
import { Link } from "react-router-dom";
import api from "../utils/Axios.js";
import validator from "validator";
import { UserContext } from "../utils/UserProvider.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUp = () => {
    // const { userid, setUserId } = useContext(UserContext);
    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const buttonRef = useRef();

    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [formValid, setFormValid] = useState(false);

    const validateName = () => {
        const name = nameRef.current.value.trim();
        if (
            !/^[A-Za-z\s]+$/.test(name) ||
            name.length < 3 ||
            name.length > 100
        ) {
            setNameError("Must be at least 3 alphabets");
        } else {
            setNameError("");
        }
    };

    const validateEmail = () => {
        const email = emailRef.current.value.trim();
        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
            email.length < 6 ||
            email.length > 254
        ) {
            setEmailError("Invalid Email Format");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = () => {
        const password = passwordRef.current.value.trim();

        if (
            !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            setPasswordError(
                "Min 8 Characters: 1 Upper | 1 Lower | 1 Number | 1 Special"
            );
        } else {
            setPasswordError("");
        }
    };

    async function handleFormSubmission(event) {
        event.preventDefault();

        validateName();
        validateEmail();
        validatePassword();

        if (nameError !== "") {
            setNameError("Must be at least 3 alphabets");
            return;
        }
        if (emailError !== "") {
            setEmailError("Invalid Email Format");
            return;
        }
        if (passwordError !== "") {
            setPasswordError(
                "Min 8 Characters: 1 Upper | 1 Lower | 1 Number | 1 Special"
            );
            return;
        }

        try {
            const res = await api.post("/register", {
                fullname: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
            console.log(res.data);
            if (res.data.success == false) {
                console.log(res.data.message);
            } else {
                console.log("User ID:", res.data.data._id);

                // setUserId(res.data.data._id);
                navigate(`/dashboard/${res.data.data._id}`);

                nameRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
            }
        } catch (error) {
            console.error(
                "Error:",
                error.response?.data?.message || error.message
            );
        }
    }

    const [PasswordVisibility, setPasswordVisibility] = useState("password");

    return (
        <section className="flex h-screen flex-col items-center">
            <div className="top-0 flex h-15 w-full place-content-between items-center bg-white px-10 shadow-md">
                <div className="flex items-center">
                    <div className={`w-10 hover:scale-105`}>
                        <img src={Logo} className="w-full" />
                    </div>
                    <span className="poppins-semibold ml-2 text-xl">
                        PingMe
                    </span>
                </div>
                <div className="text-xs">
                    <span className="text-gray-500">
                        Already have an account?
                    </span>
                    <button className="poppins-semibold ml-2 cursor-pointer rounded-xl border-2 bg-[#4b82ff] p-2 text-white hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]">
                        <Link to="/signin">Sign In</Link>
                    </button>
                </div>
            </div>
            <div className="my-auto flex justify-evenly rounded-2xl p-5 shadow-xl">
                <div className="ml-2">
                    <div className="poppins-semibold mb-8 text-4xl">
                        Sign Up
                    </div>
                    <div className="poppins-semibold my-4 text-xs">
                        Sign Up with Open account
                    </div>
                    <div className="poppins-semibold mr-2 flex w-80 cursor-pointer items-center justify-center rounded-lg border-1 border-gray-400 px-10 py-2 hover:border-gray-600">
                        <div className="w-5">
                            <img src={GoogleIcon} />
                        </div>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                console.log(credentialResponse);
                                console.log(
                                    jwtDecode(credentialResponse.credential)
                                );
                            }}
                            onError={() => console.log("Login Failed")}
                        />
                        <span>&nbsp;&nbsp;Sign Up With Google</span>
                    </div>
                    <hr className="my-6 border-1 border-gray-200" />
                    <div className="poppins-semibold text-xs">
                        or continue with email address
                    </div>
                    <form
                        className="flex w-full flex-col"
                        onSubmit={handleFormSubmission}
                    >
                        <div>
                            <div className="mt-4 flex items-center rounded-lg border border-transparent bg-gray-100 text-sm transition-all duration-300 hover:border-[#4b82ff]">
                                <label
                                    htmlFor="name"
                                    className="flex h-12 items-center rounded-l-lg"
                                >
                                    <img
                                        src={NameIcon}
                                        className="w-8 pr-1 pl-2"
                                    />
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Name"
                                    className="h-12 w-full pl-2"
                                    autoComplete="off"
                                    ref={nameRef}
                                    onBlur={validateName}
                                />
                            </div>
                            <span
                                name="errorText"
                                className="block pb-2 text-xs text-red-500"
                            >
                                &nbsp;{nameError}
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center rounded-lg border border-transparent bg-gray-100 text-sm transition-all duration-300 hover:border-[#4b82ff]">
                                <label
                                    htmlFor="email"
                                    className="flex h-12 items-center rounded-l-lg"
                                >
                                    <img
                                        src={MailIcon}
                                        className="w-8 pr-1 pl-2"
                                    />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="h-12 w-full pl-2"
                                    // minLength={6}
                                    // maxLength={254}
                                    ref={emailRef}
                                    onBlur={validateEmail}
                                    autoComplete="off"
                                    // required
                                />
                            </div>
                            <span
                                name="errorText"
                                className="block pb-2 text-xs text-red-500"
                            >
                                &nbsp;{emailError}
                            </span>
                        </div>
                        <div>
                            <div className="flex items-center rounded-lg border border-transparent bg-gray-100 text-sm transition-all duration-300 hover:border-[#4b82ff]">
                                <label
                                    htmlFor="password"
                                    className="flex h-12 items-center rounded-l-lg"
                                >
                                    <img
                                        src={PasswordIcon}
                                        className="w-9 pr-1 pl-2"
                                    />
                                </label>
                                <input
                                    type={PasswordVisibility}
                                    id="password"
                                    placeholder="Password"
                                    className="h-12 w-full pl-2"
                                    ref={passwordRef}
                                    onBlur={validatePassword}
                                    autoComplete="off"
                                />
                                <span
                                    className="flex h-12 items-center rounded-r-lg"
                                    onClick={() =>
                                        setPasswordVisibility(
                                            PasswordVisibility === "password"
                                                ? "text"
                                                : "password"
                                        )
                                    }
                                >
                                    <img
                                        src={
                                            PasswordVisibility === "password"
                                                ? HidePasswordIcon
                                                : ShowPasswordIcon
                                        }
                                        className="mr-2 w-4 cursor-pointer"
                                    />
                                </span>
                            </div>
                            <span
                                name="errorText"
                                className="block pb-2 text-xs text-red-500"
                            >
                                &nbsp;{passwordError}
                            </span>
                        </div>
                        <div className="poppins-light text-xs text-gray-500">
                            By signing up, you agree to our{" "}
                            <Link
                                to="/tos"
                                target="_blank"
                                className="underline hover:text-gray-900"
                            >
                                Terms of Service
                            </Link>{" "}
                            and <br />
                            <Link
                                to="/privacy"
                                target="_blank"
                                className="underline hover:text-gray-900"
                            >
                                Privacy Policy.
                            </Link>
                        </div>
                        <button
                            type="submit"
                            // disabled={!formValid} ${formValid ? "cursor-pointer" : "cursor-not-allowed"}
                            className={`poppins-semibold my-4 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-transparent bg-[#4b82ff] px-2 py-2 text-sm text-white transition-all duration-400 hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]`}
                            ref={buttonRef}
                        >
                            Get Started
                        </button>
                        <div className="mx-auto text-xs">
                            <span className="text-gray-500">
                                Already have an account?
                            </span>
                            <span className="poppins-semibold ml-2 cursor-pointer rounded-xl text-[#4b82ff] hover:underline">
                                <Link to="/signin">Sign In</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SignUp;
