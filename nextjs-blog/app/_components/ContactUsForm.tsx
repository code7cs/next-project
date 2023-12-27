import { useEffect, useState } from "react";
import ToastMessage from "./ToastMessage";
import { getBrowser, getDevice } from "../../utils/getUserAgent";

const initialFormData = {
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

    const emailBody = `
      <table>
        <tr>
          <th>Customer Name:</th>
          <td>${name}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>${email}</td>
        </tr>
        <tr>
          <th>Subject:</th>
          <td>${subject}</td>
        </tr>
        <tr>
          <th>Message:</th>
          <td>${message}</td>
        </tr>

        <tr>
          <th>User Agent:</th>
          <td>${userAgent}}</td>
        </tr>
      </table>
    `;
    
    const emailBodyToCustomer = `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to Eastern Spa!</p>
      <p>For price inquiries, services or immediate reservations, please feel free to call us directly at <a href="tel:+16097703693">(609) 770-3693</a>. Our friendly team is ready to assist you promptly and schedule your visit.</p>
      <p>For any other queries or messages, our team will respond to your email shortly. We strive to provide you with the best experience and look forward to serving you soon.</p>
  
      <br/>

      <!-- Signature -->
      <p>
        <img src="https://next-project-mdsc.vercel.app/assets/img/full-logo.jpg" width="230" height="80" />
      </p>
      <p><strong>Best regards,</strong></p>
      <p><strong>Eastern Spa, LLC</strong></p>
      <p><strong>Tel: </strong><a href="tel:+16097703693">(609) 770-3693</a></p>
      <p><strong>Address: 1304 NJ-47 unit w, Rio Grande, NJ 08242</strong></p>
    `;

    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          emailToMyself: emailBody,
          emailToCusotmer: emailBodyToCustomer,
        }),
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
