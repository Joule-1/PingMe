import React from "react";
import { CloseIcon } from "../assets";

const AddUserSchedule = ({setdisplayAddSchedule}) => {
    return (
        <section className={`absolute top-4 mx-[25%] w-[50%] rounded-2xl bg-gray-200 p-5 shadow-xl`}>
            <div className="flex place-content-between items-center">
                <span className="poppins-semibold text-xl">
                    Initiate Task
                    <hr className="w-[50%] rounded-full border-2 border-[#4b82ff]" />
                </span>
                <span onClick={() => (setdisplayAddSchedule("hidden"))}>
                    <img
                        src={CloseIcon}
                        className="cursor-pointer rounded-full bg-white p-1"
                    />
                </span>
            </div>
            <form className="mt-5 flex flex-col rounded-2xl bg-white pl-5 text-sm">
                <input
                    type="text"
                    placeholder="Title"
                    className="my-5 h-11 w-[70%] rounded-xl bg-gray-100 pl-4"
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Date"
                    className="h-11 w-[70%] rounded-xl bg-gray-100 pl-4"
                />
                <input
                    type="text"
                    placeholder="Time"
                    className="my-5 h-11 w-[70%] rounded-xl bg-gray-100 pl-4"
                />
                <span className="poppins-medium flex flex-col pl-2 text-base">
                    <span className="mb-1">Priority</span>
                    <span className="flex w-[70%] place-content-between">
                        <span className="flex items-center">
                            <label htmlFor="extreme">
                                <span>Extreme</span>
                                &nbsp;
                            </label>
                            <input type="radio" id="extreme" name="priority" />
                        </span>
                        <span className="flex items-center">
                            <label htmlFor="moderate">
                                <span>Moderate</span>
                                &nbsp;
                            </label>
                            <input
                                type="radio"
                                id="moderate"
                                defaultChecked 
                                name="priority"
                            />
                        </span>
                        <span className="flex items-center">
                            <label htmlFor="low">
                                <span>Low</span>
                                &nbsp;
                            </label>
                            <input type="radio" id="low" name="priority" />
                        </span>
                    </span>
                </span>
                <textarea
                    placeholder="Task Description"
                    name="description"
                    className="my-5 w-[70%] resize-none rounded-2xl border-2 px-2 pt-5"
                    rows={10}
                ></textarea>
            </form>
            <div
                className={`poppins-semibold mt-3 w-[15%] cursor-pointer rounded-2xl border-2 border-transparent bg-[#4b82ff] py-2 text-center text-sm text-white transition-all duration-400 hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]`}
            >
                Done
            </div>
        </section>
    );
};

export default AddUserSchedule;
