import React from "react";
import NavbarHome from "./NavbarHome";

const Home = () => {
    return (
        <section className="">
            <NavbarHome />
            <div className="flex place-content-between items-center">
                <div className="mx-auto border-1">
                    <div className="poppins-bold my-10 text-5xl">
                        Track. Plan.{" "}
                        <span className="text-[#4b82ff]">Succeed.</span>
                    </div>
                    {/* <div className="poppins-semibold text-2xl">
                        Capture, organize, and tackle your to-dos from anywhere.
                    </div> */}
                    <div className="poppins-semibold text-base text-gray-500">
                        Capture, organize, and tackle your to-dos from anywhere.
                        Escape the clutter and chaos—unleash your productivity
                        with PingMe.
                    </div>
                    {/* <input
                        type="text"
                        className="poppins-semibold my-20 w-[40%] rounded-sm border-1 border-gray-500 px-2 py-2"
                        placeholder="Email"
                    />
                    <button className="poppins-semibold my-20 ml-5 cursor-pointer rounded-lg border-2 bg-[#4b82ff] p-2 text-lg text-white hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]">
                        Get Started
                    </button> */}
                </div>
                {/* <div className="w-[50%]">
                    <img src="../src/assets/Home.jpg" />
                </div> */}
            </div>
        </section>
    );
};

export default Home;
