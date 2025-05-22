import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Events from "../pages/Events/Events";
import EditEvent from "../pages/EditEvent/EditEvent";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import CreateEvent from "../pages/CreateEvent/CreateEvent";
import Favorites from "../pages/Favorites/Favorites";
import Attendances from "../pages/MyAttendances/MyAttendances";
import NotFound from "../pages/NotFound/NotFound";
import EventDetail from "../pages/EventDetail/EventDetail";
import AppLayout from "../layouts/AppLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/attendances" element={<Attendances />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

