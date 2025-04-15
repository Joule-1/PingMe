import React from "react";
import { Logo } from "../assets";
import { Link } from "react-router-dom";

const NavbarHome = () => {
    return (
        <section className="flex h-15 z-50 w-full fixed place-content-between px-5 md:place-content-evenly items-center shadow-lg bg-white text-sm">
            <div className="flex items-center">
                <div className={`w-10 hover:scale-105`}>
                    <img src={Logo} className="w-full" />
                </div>
                <span className="poppins-semibold ml-2 text-xl">PingMe</span>
            </div>
            <div className="flex items-center hidden md:block poppins-semibold">
                <span className="sm:ml-10 mx-5 cursor-pointer hover:text-[#4b82ff]">
                Privacy
                </span>
                <Link
                    to="/privacy"
                    className="sm:ml-10 cursor-pointer hover:text-[#4b82ff]"
                >
                    Pricing
                </Link>
                <span className="sm:ml-10 mx-5 cursor-pointer hover:text-[#4b82ff]">
                    <Link to="/privacy">
                    Testimonials</Link>
                </span>
            </div>
            <div className="flex items-center">
                <span id="NavbarHomeSign" className="sm:ml-5 cursor-pointer ml-5 hover:text-[#4b82ff]">
                    <Link to="/signin">Sign In</Link>
                </span>
                <span id="NavbarHomeSign" className="poppins-semibold sm:ml-5 ml-2 border cursor-pointer rounded-xl border-2 bg-[#4b82ff] p-2 text-white hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]">
                    <Link to="/signup">Sign Up for Free</Link>
                </span>
            </div>
        </section>
    );
};

export default NavbarHome;
