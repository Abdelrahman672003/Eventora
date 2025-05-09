import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { Navbar } from "../components";
import Footer from "../components/organisms/Footer";
import Events from "../pages/Events";
import EventDetails from "../pages/EventDetails";
import Congratulations from "../pages/Congratulations";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import AddEvent from "../pages/AddEvent";

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/congratulations" element={<Congratulations />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/add" element={<AddEvent />} />
      <Route path="/dashboard/update/:eventId" element={<AddEvent />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);

export default AppRoutes;
