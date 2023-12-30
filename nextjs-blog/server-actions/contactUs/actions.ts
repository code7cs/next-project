'use server'

import nodemailer from "nodemailer";
import { generateEmailBodyToCustomer, generateEmailBodyToMyself } from "../../lib/utils/emailTemplate";

export const sendEmail = async (formData: FormData, userAgent: string) => {
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
            subject: `Customer Message Received - ${formData.get("name")}`,
            html: generateEmailBodyToMyself(
                {
                    name: formData.get("name") as string,
                    email: formData.get("email") as string,
                    subject: formData.get("subject") as string,
                    message: formData.get("message") as string,
                    userAgent
                }
            ),
        });

        // Send the auto-reply email to customer
        await transporter.sendMail({
            from: "eastern.spa.rio.grande@gmail.com",
            to: formData.get("email"),
            subject: "Thank you for Contacting Eastern Spa!",
            html: generateEmailBodyToCustomer(formData.get("name") as string),
        });

        // Respond with success message
        return { message: "OK" };
    } catch (error) {
        // Respond with error message
        return { error };
    }
}