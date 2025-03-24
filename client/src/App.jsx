import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import DynamicTitle from "./utils/DynamicTitle.jsx";
import Privacy from "./components/Privacy.jsx";
import TermsOfService from "./components/TermsOfService.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
    return (
        <>
            <BrowserRouter> 
                <DynamicTitle />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/privacy" element={<Privacy />}></Route>
                    <Route path="/tos" element={<TermsOfService />}></Route>
                    <Route
                        path="/dashboard/:userid"
                        element={<UserDashboard />}
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
