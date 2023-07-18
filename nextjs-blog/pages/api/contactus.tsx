import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Configure Nodemailer with your email service provider settings
    const transporter = nodemailer.createTransport({
        // port: 465,
        // host: "smtp.gmail.com",
      service: "Gmail",
      auth: {
        user: "eastern.spa.rio.grande@gmail.com",
        pass: process.env.EMAIL_PWD
      },
      secure: true
    });

    try {
      // Send the email
      await transporter.sendMail({
        from: "eastern.spa.rio.grande@gmail.com",
        to: "eastern.spa.rio.grande@gmail.com",
        subject: "Customer Message Received",
        html: req.body
      });

      // Respond with success message
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      // Respond with error message
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    // Respond with method not allowed error
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
