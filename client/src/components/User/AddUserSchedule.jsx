import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    addSchedule,
    fetchSchedule,
} from "../../features/ScheduleManipulationSlice";
import { CloseIcon } from "../../assets";
import { useContext } from "react";
import { UserContext } from "../../utils/UserProvider";

const AddUserSchedule = ({setIsAddScheduleVisible}) => {
    const { userIdGlobal, setUserIdGlobal } = useContext(UserContext);

    const [formData, setFormData] = useState({
        userid: userIdGlobal,
        title: "",
        date: "",
        time: "",
        priority: "Moderate",
        description: "",
    });
    
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchSchedule());
    // }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addSchedule(formData));

        setFormData({
            title: "",
            date: "",
            time: "",
            priority: "Moderate",
            description: "",
        });

        setIsAddScheduleVisible(false);
    };

    return (
        <section className="absolute top-4 mx-[25%] w-[50%] rounded-2xl bg-gray-200 p-5 shadow-xl">
            <div className="flex items-center justify-between">
                <span className="poppins-semibold text-xl">
                    Initiate Task
                    <hr className="w-[50%] rounded-full border-2 border-[#4b82ff]" />
                </span>
                <span onClick={() => setIsAddScheduleVisible(false)}>
                    <img
                        src={CloseIcon}
                        className="cursor-pointer rounded-full bg-white p-1"
                    />
                </span>
            </div>
            <form
                onSubmit={handleSubmit}
                className="mt-5 flex flex-col text-sm"
            >
                <div className="rounded-2xl bg-white pl-5">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        className="my-5 h-11 w-[70%] rounded-xl bg-gray-100 pl-4"
                        autoFocus
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        className="h-11 w-[70%] rounded-xl bg-gray-100 pl-4"
                        onChange={handleChange}
                    />
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        className="my-5 h-11 w-[70%] rounded-xl bg-gray-100 pl-4"
                        onChange={handleChange}
                    />

                    <span className="poppins-medium flex flex-col pl-2 text-base">
                        <span className="mb-1">Priority</span>
                        <span className="flex w-[70%] justify-between">
                            {["Extreme", "Moderate", "Low"].map((level) => (
                                <label
                                    key={level}
                                    className="flex items-center"
                                >
                                    <input
                                        type="radio"
                                        name="priority"
                                        value={level}
                                        checked={formData.priority === level}
                                        onChange={handleChange}
                                    />
                                    <span className="ml-1">{level}</span>
                                </label>
                            ))}
                        </span>
                    </span>

                    <textarea
                        name="description"
                        placeholder="Task Description"
                        value={formData.description}
                        className="my-5 w-[70%] resize-none rounded-2xl border-2 px-2 pt-5"
                        rows={5}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="poppins-semibold mt-3 w-[15%] cursor-pointer rounded-2xl border-2 border-transparent bg-[#4b82ff] py-2 text-center text-sm text-white transition-all duration-400 hover:border-[#4b82ff] hover:bg-white hover:text-[#4b82ff]"
                >
                    Done
                </button>
            </form>
        </section>
    );
};

export default AddUserSchedule;
