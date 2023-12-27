import { useEffect, useState } from "react";
import ToastMessage from "./ToastMessage";
import { ContactUsFormData } from "../../lib/types/definitions";
import { getBrowser, getDevice } from "../../lib/utils/getUserAgent";

const initialFormData: ContactUsFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactUsForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const device = getDevice(userAgent);
    const browser = getBrowser(userAgent);
    setUserAgent(
      userAgent + ". Device is: " + device + ". Browser is: " + browser
    );
  }, []);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 7000);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return;
    }

    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userAgent }),
      });

      if (response.ok) {
        console.log("Message sent successfully");
        handleShowToast();
      } else {
        console.error("Failed to send message");
      }

      // Clear form fields
      setFormData(initialFormData);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-xl uppercase mb-4">Contact Us</h1>
      <p className="text-sm">*For reservation and pricing,</p>
      <p className="text-sm mb-2">kindly call us directly.</p>
      {/* <a
        href="mailto:eastern.spa.rio.grande@gmail.com"
        target="_blank"
        className="mb-4"
      >
        <span className="italic text-sm">eastern.spa.rio.grande@gmail.com</span>
      </a> */}
      <form onSubmit={handleSubmit}>
        <label className="label">
          <span className="label-text text-white">Name *</span>
        </label>
        <input
          className="input input-bordered w-full max-w-3xl text-darkgreen bg-white"
          name="name"
          onChange={handleFormChange}
          placeholder="Type your name here"
          required
          type="text"
          value={formData.name}
        />

        <label className="label">
          <span className="label-text text-white">Email *</span>
        </label>
        <input
          className="input input-bordered w-full max-w-3xl text-darkgreen bg-white"
          name="email"
          onChange={handleFormChange}
          placeholder="Type your email here"
          required
          type="email"
          value={formData.email}
        />

        <label className="label">
          <span className="label-text text-white">Subject *</span>
        </label>
        <input
          className="input input-bordered w-full max-w-3xl text-darkgreen bg-white"
          name="subject"
          onChange={handleFormChange}
          placeholder="Type subject here"
          required
          type="text"
          value={formData.subject}
        />

        <label className="label">
          <span className="label-text text-white">Message *</span>
        </label>
        <textarea
          className="textarea textarea-bordered textarea-md h-24 w-full max-w-3xl text-darkgreen bg-white min-h-16"
          name="message"
          onChange={handleFormChange}
          required
          value={formData.message}
        ></textarea>

        <button
          className="btn btn-outline w-full max-w-3xl mt-8 mb-4 text-white"
          type="submit"
          disabled={isLoading}
        >
          <span className="!text-white">Submit&nbsp;</span>
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin text-white text-xl"></i>
          ) : (
            <i className="fa-regular fa-paper-plane"></i>
          )}
        </button>
      </form>

      <ToastMessage showToast={showToast} />
    </>
  );
};

export default ContactUsForm;
