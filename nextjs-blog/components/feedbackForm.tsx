import { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    // console.log("handleSubmit, e: ", e)
    e.preventDefault();

    // Perform any necessary form validation and submission logic

    try {
      // Send feedback to the API route for email sending
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        // Feedback sent successfully
        console.log("Feedback sent successfully");
      } else {
        // Failed to send feedback
        console.error("Failed to send feedback");
      }

      // Clear form fields
      setFeedback("");
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <label for="first">First name:</label>
      <input type="text" id="first" name="first" />
      <label for="last">Last name:</label>
      <input type="text" id="last" name="last" /> */}
      <label>
        Feedback:
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
