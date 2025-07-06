import React from "react";
import { Logo } from "../../assets";
import { Link } from "react-scroll";

const NavbarHome = () => {
    return (
        <section className="fixed z-50 flex h-15 w-full place-content-between items-center bg-white px-5 text-sm shadow-lg md:place-content-evenly">
            <a className="flex items-center" href="/home">
                <div className={`w-10 hover:scale-105`}>
                    <img src={Logo} className="w-full" />
                </div>
                <span className="poppins-semibold ml-2 text-xl">PingMe</span>
            </a>
            <div className="poppins-semibold flex hidden items-center md:block">
                <span className="mx-5 cursor-pointer hover:text-[#4b82ff] sm:ml-10">
                    <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy
                    </a>
                </span>
                <Link
                    to="pricings"
                    id="pricings"
                    offset={-40}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer hover:text-[#4b82ff] sm:ml-10"
                >
                    Pricing
                </Link>
                <span className="mx-5 cursor-pointer hover:text-[#4b82ff] sm:ml-10">
                    <Link
                        to="testimonials"
                        id="testimonials"
                        offset={-60}
                        smooth={true}
                        duration={500}
                    >
                        Testimonials
                    </Link>
                </span>
            </div>
            <div className="flex items-center">
                <span
                    id="NavbarHomeSign"
                    className="ml-5 cursor-pointer hover:text-[#4b82ff] sm:ml-5"
                >
                    <a href="/signin" target="_blank" rel="noopener noreferrer">
                        Sign In
                    </a>
                </span>
                <span
                    id="NavbarHomeSign"
                    className="poppins-semibold ml-2 cursor-pointer rounded-xl border border-2 bg-[#4b82ff] p-2 text-white hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff] sm:ml-5"
                >
                    <a href="/signup" target="_blank" rel="noopener noreferrer">
                        Sign Up
                    </a>
                </span>
            </div>
        </section>
    );
};

export default NavbarHome;
