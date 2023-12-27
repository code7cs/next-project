// TODO: use Route Handlers - https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { generateEmailBodyToCustomer, generateEmailBodyToMyself } from "../../lib/utils/emailTemplate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Configure Nodemailer with your email service provider settings
    const transporter = nodemailer.createTransport({
      // port: 465,
      // host: "smtp.gmail.com",
      service: "Gmail",
      auth: {
        user: "eastern.spa.rio.grande@gmail.com",
        pass: process.env.EMAIL_PWD,
      },
      secure: true,
    });

    try {
      // Send the email to myself
      await transporter.sendMail({
        from: "eastern.spa.rio.grande@gmail.com",
        to: "eastern.spa.rio.grande@gmail.com",
        subject: `Customer Message Received - ${req.body.name}`,
        html: generateEmailBodyToMyself(req.body),
      });

      // Send the auto-reply email to customer
      await transporter.sendMail({
        from: "eastern.spa.rio.grande@gmail.com",
        to: req.body.email,
        subject: "Thank you for Contacting Eastern Spa!",
        html: generateEmailBodyToCustomer(req.body.name),
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
