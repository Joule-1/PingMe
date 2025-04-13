import React from "react";
import {
    Logo,
    ThemeToggle_Dark,
    TaskIcon,
    CheckBoxIcon,
    CommentIcon,
    HomeCalendarIcon2
} from "../assets";

const FooterHome = () => {
    const currentYear = new Date().getFullYear();
    return (
        <section className="bg-gray-100 px-10 pt-5">
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
                <div className="bg-gray-50 relative shadow-xl w-25 rotate-20 p-2 rounded-xl">
                    <img src={TaskIcon} className="w-full" />
                </div>
                <div className="bg-gray-50 relative bottom-[-60px] shadow-2xl w-25 -rotate-30 p-2 rounded-xl">
                    <img src={CheckBoxIcon} />
                </div>
                <div className="bg-gray-50 relative shadow-xl rotate-35 w-25 p-2 rounded-xl">
                    <img src={HomeCalendarIcon2} />
                </div>
                <div className="bg-gray-50 relative bottom-[-30px] -rotate-15 shadow-xl w-25 p-2 rounded-xl">
                    <img src={CommentIcon} />
                </div>
                <div className="bg-gray-50 relative shadow-xl rotate-35 w-25 p-2 rounded-xl">
                    <img src={ThemeToggle_Dark} />
                </div>
            </div>
            <hr className="border-gray-300 mt-20" />
            <div className="flex justify-between py-5 text-sm text-gray-600">
                <div>© {currentYear}. All rights reserved.</div>
                <div>
                    <span className="mx-2 cursor-pointer">Privacy Policy</span>
                    <span className="mx-2 cursor-pointer">
                        Terms of Service
                    </span>
                    <span className="mx-2 cursor-pointer">Pricing</span>
                    <span className="mx-2 cursor-pointer">Testimonials</span>
                </div>
            </div>
        </section>
    );
};

export default FooterHome;
