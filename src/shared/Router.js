import { Navigate, Route, Routes } from "react-router-dom";

//pages
import Room from "../pages/Room";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import CreateRoom from "../pages/CreateRoom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room/create" element={<CreateRoom />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
