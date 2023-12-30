"use client";

import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import ToastMessage from "./ToastMessage";
import { ContactUsFormData } from "../lib/types/definitions";
import { getBrowser, getDevice } from "../lib/utils/getUserAgent";
import { sendEmail } from "../server-actions/contactUs/actions";

const initialFormData: ContactUsFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactUsSection = () => {
  const [contactUsForm, setContactUsForm] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
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
    setContactUsForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    // use server-actions
    const { message } = await sendEmail(formData, userAgent);
    if (message === "OK") {
      setContactUsForm(initialFormData);
      handleShowToast();
    }
  };

  return (
    <>
      <h1 className="text-xl uppercase mb-4">Contact Us</h1>
      <p className="text-sm">*For reservation and pricing,</p>
      <p className="text-sm mb-2">kindly call us directly.</p>

      <form action={handleSubmit}>
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
          value={contactUsForm.name}
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
          value={contactUsForm.email}
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
          value={contactUsForm.subject}
        />

        <label className="label">
          <span className="label-text text-white">Message *</span>
        </label>
        <textarea
          className="textarea textarea-bordered textarea-md h-24 w-full max-w-3xl text-darkgreen bg-white min-h-16"
          name="message"
          onChange={handleFormChange}
          required
          value={contactUsForm.message}
        ></textarea>

        <SubmitButton />
      </form>

      <ToastMessage showToast={showToast} />
    </>
  );
};

export default ContactUsSection;
