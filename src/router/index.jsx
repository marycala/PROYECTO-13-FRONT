import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import { useEffect } from "react";
import { setApiNavigate } from "../utils/apiFetch";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

const RouterWithNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setApiNavigate(navigate);
  }, [navigate]);

  return (
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact /> }/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterWithNavigate />
    </BrowserRouter>
  );
};

export default AppRouter;

