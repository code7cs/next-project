"use server";

import { hash } from "bcrypt";
import prisma from "@/db/prisma";

export const addUserToDatabase = async (formData: FormData) => {
  try {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return { error: "Email and password are required.", status: 400 };
    }

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return { error: "Email already exists.", status: 409 };
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        userName: email.split("@")[0],
        password: hashedPassword,
        originPassword: password
      },
    });

    return {
      user: newUser,
      message: "User created successfully.",
      status: 201,
    };
  } catch (error) {
    return { error: "Something went wrong.", status: 500 };
  }
};
