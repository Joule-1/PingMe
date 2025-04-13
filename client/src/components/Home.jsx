import React from "react";
import NavbarHome from "./NavbarHome";
import {
    Logo,
    HomeCalendarIcon1,
    HomeCalendarIcon2,
    ChecklistPenIcon,
    ChecklistNoteIcon,
    TestimoniaIcon1,
    TestimoniaIcon2,
    TestimoniaIcon3,
    TestimoniaIcon4,
    TestimoniaIcon5,
    TestimoniaIcon6,
    TaskIcon,
    CheckBoxIcon,
    CommentIcon,
    ThemeToggle_Dark,
} from "../assets";

const Home = () => {
    const currentYear = new Date().getFullYear();
    return (
        <section>
            <NavbarHome />
            <div>
                <span className="absolute right-5 bottom-10 w-60">
                    <img src={ChecklistPenIcon} className="w-full" />
                </span>
                <span className="absolute bottom-[-100px] left-15 w-40">
                    <img src={ChecklistNoteIcon} className="w-full" />
                </span>
                <span className="absolute top-30 left-15 w-60">
                    <img src={HomeCalendarIcon1} className="w-full" />
                </span>
            </div>
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center">
                    <span className="w-22 rounded-2xl shadow-2xl">
                        <img src={Logo} />
                    </span>
                    <div className="poppins-bold my-6 text-5xl">
                        Track. Plan.{" "}
                        <span className="text-[#4b82ff]">Succeed.</span>
                    </div>
                    <div className="poppins-semibold text-base text-gray-500">
                        PingMe isn’t just how you get things done—it’s how you
                        rise, reign, and rewrite reality with every move you
                        make.”
                    </div>
                    <button className="poppins-semibold my-6 cursor-pointer rounded-2xl border border-2 border-[#4b82ff] bg-[#4b82ff] p-2 px-5 text-base text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#4b82ff]">
                        Get Started
                    </button>
                </div>
            </div>
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="poppins-semibold my-5 text-4xl">
                    People just like you are already using PingMe
                </div>
                <div className="my-5 grid grid-cols-3 gap-5 px-30">
                    <div className="row-span-15 flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl">
                        <div className="poppins-medium text-sm leading-7">
                            “In this app, time collapses and intention
                            transforms into cosmic action. Every task is not
                            merely completed — it is manifested from the very
                            ether of possibility. It is a force of nature, a
                            tool that reshapes the universe through sheer will.”
                        </div>
                        <div className="my-1 flex gap-2">
                            <span className="">
                                <img
                                    src={TestimoniaIcon1}
                                    className="h-full w-10 rounded-lg"
                                />
                            </span>
                            <span className="flex flex-col">
                                <span className="poppins-bold text-base text-gray-400">
                                    Lysandra O.
                                </span>
                                <span className="poppins-bold text-base text-gray-600">
                                    Temporal Sovereign
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="row-span-8 flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl">
                        <div className="poppins-medium text-sm leading-7">
                            “This app is not bound by the laws of reality. It is
                            a vortex, pulling your goals into existence with a
                            power that warps time itself.”
                        </div>
                        <div className="my-1 flex gap-2">
                            <span className="">
                                <img
                                    src={TestimoniaIcon2}
                                    className="h-full w-10 rounded-lg"
                                />
                            </span>
                            <span className="flex flex-col">
                                <span className="poppins-bold text-base text-gray-400">
                                    Riven X.
                                </span>
                                <span className="poppins-bold text-base text-gray-600">
                                    Architect of the Void
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="row-span-8 flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl">
                        <div className="poppins-medium text-sm leading-7">
                            “To use this app is to become the weaver of fate.
                            Every action you take sends ripples through the
                            fabric of the multiverse.”
                        </div>
                        <div className="my-1 flex gap-2">
                            <span className="">
                                <img
                                    src={TestimoniaIcon3}
                                    className="h-full w-10 rounded-lg"
                                />
                            </span>
                            <span className="flex flex-col">
                                <span className="poppins-bold text-base text-gray-400">
                                    Eirlys A.
                                </span>
                                <span className="poppins-bold text-base text-gray-600">
                                    Alchemist of the Infinite
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="row-span-15 flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl">
                        <div className="poppins-medium text-sm leading-7">
                            “This is not a to-do list. This is a manifestation
                            engine — one that transfigures intention into
                            reality at the quantum level. Purpose flows through
                            it like a river of light, and with every task
                            completed, you move closer to becoming a legend.”
                        </div>
                        <div className="my-1 flex gap-2">
                            <span className="">
                                <img
                                    src={TestimoniaIcon4}
                                    className="h-full w-10 rounded-lg"
                                />
                            </span>
                            <span className="flex flex-col">
                                <span className="poppins-bold text-base text-gray-400">
                                    Sable V.
                                </span>
                                <span className="poppins-bold text-base text-gray-600">
                                    Architect of Destiny
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="row-span-15 flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl">
                        <div className="poppins-medium text-sm leading-7">
                            “To use this app is to hold the very blueprints of
                            the universe in your hands. It is a portal through
                            which you manifest your goals, bending time and
                            space to your will. Each task you complete echoes
                            across eternity, rewriting your fate.”
                        </div>
                        <div className="my-1 flex gap-2">
                            <span className="">
                                <img
                                    src={TestimoniaIcon5}
                                    className="h-full w-10 rounded-lg"
                                />
                            </span>
                            <span className="flex flex-col">
                                <span className="poppins-bold text-base text-gray-400">
                                    Thalax S.
                                </span>
                                <span className="poppins-bold text-base text-gray-600">
                                    Transcendent Sage
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="row-span-8 flex flex-col justify-between rounded-xl border border-gray-400 bg-gray-50 p-5 transition-all duration-500 hover:border-white hover:bg-white hover:shadow-xl">
                        <div className="poppins-medium text-sm leading-7">
                            “This app is a living force, binding time,
                            intention, and action into an infinite spiral of
                            creation. It is not a tool — it is the heartbeat of
                            the cosmos.”
                        </div>
                        <div className="my-1 flex gap-2">
                            <span className="">
                                <img
                                    src={TestimoniaIcon6}
                                    className="h-full w-10 rounded-lg"
                                />
                            </span>
                            <span className="flex flex-col">
                                <span className="poppins-bold text-base text-gray-400">
                                    Icarus M.
                                </span>
                                <span className="poppins-bold text-base text-gray-600">
                                    Keeper of the Infinite Path
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="poppins-semibold my-5 text-4xl">
                    People just like you are already using PingMe
                </div>
                <div className="mt-10 flex gap-8">
                    <div className="flex flex-col rounded-xl border border-gray-400 bg-gray-50 p-5 px-8 transition-all duration-500 hover:scale-101">
                        <span className="poppins-semibold my-1 text-xl">
                            Basic Plan
                        </span>
                        <span className="poppins-medium text-xs text-gray-400">
                            Perfect for individuals
                        </span>
                        <hr className="my-5 border-gray-300" />
                        <span className="poppins-semibold">
                            <span className="text-4xl">$0</span>
                            <span className="poppins-medium text-2xl text-gray-500">
                                /mo
                            </span>
                        </span>
                        <button className="poppins-semibold my-5 cursor-pointer rounded-lg border border-2 border-[#4b82ff] bg-[#4b82ff] p-1 px-15 text-base text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#4b82ff]">
                            Get Started
                        </button>
                        <hr className="my-5 border-gray-300" />
                        <span className="poppins-medium flex flex-col text-sm">
                            <span>
                                ✔ &nbsp;&nbsp;&nbsp;All product features
                            </span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited lists & tasks
                            </span>
                            <span>✔ &nbsp;&nbsp;&nbsp;Priority Support</span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited Tasks
                            </span>
                            <span>
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited file storage
                            </span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited projects
                            </span>
                        </span>
                    </div>
                    <div className="flex scale-110 flex-col rounded-xl border border-[#4b82ff] bg-[#4b82ff] p-5 px-8 shadow-xl transition-all duration-500 hover:scale-111">
                        <span className="poppins-semibold my-1 text-xl text-white">
                            Pro Plan
                        </span>
                        <span className="poppins-medium text-xs text-gray-300">
                            Perfect for individuals
                        </span>
                        <hr className="my-5 border-gray-300" />
                        <span className="poppins-semibold">
                            <span className="text-4xl text-white">$0</span>
                            <span className="poppins-medium text-2xl text-gray-300">
                                /mo
                            </span>
                        </span>
                        <span className="poppins-medium my-2 text-xs text-gray-300">
                            Best Choice
                        </span>
                        <button className="poppins-semibold my-3 cursor-pointer rounded-lg border border-2 border-[#4b82ff] bg-white p-1 px-15 text-base text-[#4b82ff] shadow-xl transition-all duration-300 hover:border-white hover:bg-[#4b82ff] hover:text-white">
                            Get Started
                        </button>
                        <hr className="my-5 border-gray-300" />
                        <span className="poppins-medium flex flex-col text-sm text-white">
                            <span>
                                ✔ &nbsp;&nbsp;&nbsp;All product features
                            </span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited lists & tasks
                            </span>
                            <span>✔ &nbsp;&nbsp;&nbsp;Priority Support</span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited Tasks
                            </span>
                            <span>
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited file storage
                            </span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited projects
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-col rounded-xl border border-gray-400 bg-gray-50 p-5 px-8 transition-all duration-500 hover:scale-101">
                        <span className="poppins-semibold my-1 text-xl">
                            Advanced Plan
                        </span>
                        <span className="poppins-medium text-xs text-gray-400">
                            Perfect for individuals
                        </span>
                        <hr className="my-5 border-gray-300" />
                        <span className="poppins-semibold">
                            <span className="text-4xl">$0</span>
                            <span className="poppins-medium text-2xl text-gray-500">
                                /mo
                            </span>
                        </span>
                        <button className="poppins-semibold my-5 cursor-pointer rounded-lg border border-2 border-[#4b82ff] bg-[#4b82ff] p-1 px-15 text-base text-white shadow-xl transition-all duration-300 hover:bg-white hover:text-[#4b82ff]">
                            Get Started
                        </button>
                        <hr className="my-5 border-gray-300" />
                        <span className="poppins-medium flex flex-col text-sm">
                            <span>
                                ✔ &nbsp;&nbsp;&nbsp;All product features
                            </span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited lists & tasks
                            </span>
                            <span>✔ &nbsp;&nbsp;&nbsp;Priority Support</span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited Tasks
                            </span>
                            <span>
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited file storage
                            </span>
                            <span className="my-2">
                                ✔ &nbsp;&nbsp;&nbsp;Unlimited projects
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 px-10 pt-5">
                <div>
                    <div className="flex items-center">
                        <div className={`w-10 hover:scale-105`}>
                            <img src={Logo} className="w-full" />
                        </div>
                        <span className="poppins-semibold ml-2 text-xl">
                            PingMe
                        </span>
                    </div>
                </div>
                <div className="poppins-medium my-5 text-xl">
                    Stay organized and boost your productivity
                </div>
                <div className="flex items-center justify-evenly">
                    <div className="relative w-25 rotate-20 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={TaskIcon} className="w-full" />
                    </div>
                    <div className="relative bottom-[-60px] w-25 -rotate-30 rounded-xl bg-gray-50 p-2 shadow-2xl">
                        <img src={CheckBoxIcon} />
                    </div>
                    <div className="relative w-25 rotate-35 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={HomeCalendarIcon2} />
                    </div>
                    <div className="relative bottom-[-30px] w-25 -rotate-15 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={CommentIcon} />
                    </div>
                    <div className="relative w-25 rotate-35 rounded-xl bg-gray-50 p-2 shadow-xl">
                        <img src={ThemeToggle_Dark} />
                    </div>
                </div>
                <hr className="mt-20 border-gray-300" />
                <div className="flex justify-between py-5 text-sm text-gray-600">
                    <div>© {currentYear}. All rights reserved.</div>
                    <div>
                        <span className="mx-2 cursor-pointer">
                            Privacy Policy
                        </span>
                        <span className="mx-2 cursor-pointer">
                            Terms of Service
                        </span>
                        <span className="mx-2 cursor-pointer">Pricing</span>
                        <span className="mx-2 cursor-pointer">
                            Testimonials
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
