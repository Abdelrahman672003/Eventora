import React, { useEffect, useState } from "react";
import { useForm } from "@formspree/react";
import { toast } from "react-toastify";
import { Mail, Phone } from "lucide-react";

const ContactTemplate = () => {
  const [state, handleSubmit] = useForm("xeogponb");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const FormHandleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && message) {
      handleSubmit(e);
    } else {
      toast.error("Please fill all the fields", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        closeButton: false,
      });
    }
  };

  useEffect(() => {
    if (state.succeeded) {
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      toast.success(
        "Thank you for filling the form! We will get back to you as soon as possible.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
          closeButton: false,
        }
      );
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-white dark:from-gray-900 dark:to-gray-800 px-6 py-16 pt-36">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-5xl font-bold mb-6 text-primary dark:text-white">
            Let's Connect
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
            We're here to help bring your vision to life. Whether you have
            questions about our services, want to discuss a potential
            collaboration, or simply want to say hello - we'd love to hear from
            you.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-8">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Mail className="h-5 w-5" />
              <span>support@eventora.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Phone className="h-5 w-5" />
              <span>+20 1234567890</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form className="space-y-6 text-left" onSubmit={FormHandleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmed Mohamed"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmed@gmail.com"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 1234567890"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your event or inquiry..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-primary dark:bg-secondary dark:text-primary text-white py-4 px-6 rounded-xl font-medium hover:opacity-90 transition-all duration-300 transform shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactTemplate;
