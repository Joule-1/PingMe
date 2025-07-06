import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../utils/UserAxios";
import NotFound from "../NotFound";
import UserNavbar from "../UserNavbar";
import Calendar from "../../utils/Calendar";
import UserScheduleList from "../UserScheduleList";
import { UserContext } from "../../utils/UserProvider";
import { useContext } from "react";

const UserDashboard = () => {
    const { userid } = useParams();
    const [user_name, setUser_Name] = useState();
    const [notFound, setNotFound] = useState();
    const { userIdGlobal, setUserIdGlobal } = useContext(UserContext);
    
    console.log("useridParams " + userid)
    useEffect(() => {
        if (userid) {
            fetchUser();
            setUserIdGlobal(userid)
        }       

    }, [userid]);

    const fetchUser = async () => {
        try {
            const res = await api.post(
                "/authenticate-user",
                {
                    _id: userid,
                },
                { withCredentials: true }
            );

            if (res.data.success == true) {
                
                setUser_Name(res.data.data.fullname);
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        } catch (error) {
            setNotFound(true);
        }
    };

    if (notFound) return <NotFound />;

    return (
        <section className="h-screen bg-gray-200">
            <UserNavbar />
            <div className="grid grid-cols-2 gap-5 px-4">
                <div className="border bg-white">
                    <div></div>
                    <div className="border">
                        <Calendar />
                    </div>
                </div>
                <div className="border bg-white">
                    <UserScheduleList />
                </div>
            </div>
        </section>
    );
};

export default UserDashboard;
