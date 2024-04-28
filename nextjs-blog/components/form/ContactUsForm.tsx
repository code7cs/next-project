"use client";

import { getBrowser, getDevice } from "@/lib/utils/getUserAgent";
import { useEffect, useState } from "react";
import { ContactUsFormData } from "@/lib/types/definitions";
import React from "react";
import SubmitButton from "./SubmitButton";
import ToastMessage from "../ToastMessage";
import { sendEmail } from "@/server-actions/contactUs/actions";

const initialFormData: ContactUsFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactUsForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showToast, setShowToast] = useState(false);
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const device = getDevice(userAgent);
    const browser = getBrowser(userAgent);
    setUserAgent(
      userAgent + ". Device is: " + device + ". Browser is: " + browser,
    );
  }, []);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 7000);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData: FormData) => {
    // use server-actions
    const { message } = await sendEmail(formData, userAgent);
    if (message === "OK") {
      setFormData(initialFormData);
      handleShowToast();
    }
  };

  return (
    <>
      <h1 className="text-xl uppercase mb-4">Contact Us</h1>
      <p className="text-sm">*For reservation and pricing,</p>
      <p className="text-sm mb-2">kindly call us directly.</p>
      <p className="text-sm">
        <a href="tel:+16097703693">
          <i
            className="fas fa-phone"
          ></i>
          &nbsp;&nbsp;
          <span className="text-yellow-100 underline inline-block">
            609.770.3693
          </span>
        </a>
      </p>

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

        <SubmitButton text="submit" />
      </form>

      {showToast && <ToastMessage isSuccess={true} />}
    </>
  );
};

export default ContactUsForm;
