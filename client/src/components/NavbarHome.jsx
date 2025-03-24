import React from "react";
import { Logo } from "../assets";
import { Link } from "react-router-dom";

const imgStyle = "w-5 hover:scale-105";

const NavbarHome = () => {
    return (
        <section className="shadom-md fixed z-10 flex h-15 w-full place-content-evenly items-center border-2 bg-white text-sm">
            <div className="flex items-center">
                <div className={`w-10 hover:scale-105`}>
                    <img src={Logo} className="w-full" />
                </div>
                <span className="poppins-semibold ml-2 text-xl">PingMe</span>
            </div>
            <div className="flex items-center">
                <span className="ml-10 cursor-pointer hover:text-[#4b82ff]">
                    Features
                </span>
                <Link
                    to="/privacy"
                    className="ml-10 cursor-pointer hover:text-[#4b82ff]"
                >
                    Privacy
                </Link>
                <span className="ml-10 cursor-pointer hover:text-[#4b82ff]">
                    Pricing
                </span>
            </div>
            <div className="flex items-center">
                <span className="ml-5 cursor-pointer hover:text-[#4b82ff]">
                    <Link to="/signin">Sign In</Link>
                </span>
                <span className="poppins-semibold ml-5 cursor-pointer rounded-xl border-2 bg-[#4b82ff] p-2 text-white hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]">
                    <Link to="/signup">Sign Up for Free</Link>
                </span>
            </div>
        </section>
    );
};

export default NavbarHome;
