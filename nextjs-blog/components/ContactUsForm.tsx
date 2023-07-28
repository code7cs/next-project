import { useEffect, useState } from "react";
import ToastMessage from "./ToastMessage";

const initialFormData = {
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
      userAgent + ". Device is: " + device + ". Browser is: " + browser
    );
  }, []);

  const handleShowToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
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
    try {
      const response = await fetch("/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
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
  };

  return (
    <>
      <h1 className="text-xl uppercase mb-4">Contact Us</h1>
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
        >
          Submit <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>

      <ToastMessage showToast={showToast} />
    </>
  );
};

export default ContactUsForm;

// Helper function to get device information
function getDevice(userAgent) {
  if (userAgent.match(/iPhone/i)) {
    return "iPhone";
  } else if (userAgent.match(/Android/i)) {
    return "Android";
  } else if (userAgent.match(/iPad/i)) {
    return "iPad";
  } else if (userAgent.match(/Windows Phone/i)) {
    return "Windows Phone";
  } else if (userAgent.match(/Windows/i)) {
    return "Windows PC";
  } else if (userAgent.match(/Macintosh/i)) {
    return "Mac";
  } else if (userAgent.match(/Linux/i)) {
    return "Linux";
  } else {
    return "Unknown Device";
  }
}

// Helper function to get browser information
function getBrowser(userAgent) {
  if (userAgent.match(/Edge/i)) {
    return "Microsoft Edge";
  } else if (userAgent.match(/Chrome/i)) {
    return "Google Chrome";
  } else if (userAgent.match(/Safari/i)) {
    return "Safari";
  } else if (userAgent.match(/Firefox/i)) {
    return "Mozilla Firefox";
  } else if (userAgent.match(/Opera|OPR/i)) {
    return "Opera";
  } else if (userAgent.match(/Trident/i) || userAgent.match(/MSIE/i)) {
    return "Internet Explorer";
  } else {
    return "Unknown Browser";
  }
}
