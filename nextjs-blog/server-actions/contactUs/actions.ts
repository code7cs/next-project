"use server";

import {
  generateEmailBodyToCustomer,
  generateEmailBodyToMyself,
} from "@/lib/utils/emailTemplate";
import nodemailer from "nodemailer";
import { hash } from "bcrypt";
import prisma from "@/db/prisma";

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
      html: generateEmailBodyToMyself({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
        userAgent,
      }),
    });

    // Send the auto-reply email to customer
    await transporter.sendMail({
      from: "eastern.spa.rio.grande@gmail.com",
      to: formData.get("email"),
      subject: "Thank you for Contacting Eastern Spa!",
      html: generateEmailBodyToCustomer(formData.get("name") as string),
    });

    // Create or update a dummy user in the database to generate write activity and prevent Supabase from pausing or deleting the project due to inactivity.
    // This ensures the database stays active by performing a database insert/update operation on every contact form submission.
    const email = formData.get("email") as string;
    const password = "password123";
    const hashedPassword = await hash(password, 10);
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        userName: formData.get("name") as string,
        password: hashedPassword,
        originPassword: password,
      },
    });

    // Respond with success message
    return { message: "OK" };
  } catch (error) {
    // Respond with error message
    return { error };
  }
};
