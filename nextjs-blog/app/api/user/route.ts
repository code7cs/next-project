import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "../../../db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userName, password } = body;

    // check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 409 },
      );
    }

    // check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: {
        userName: userName,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        userName: userName,
        password: hashedPassword,
      },
    });

    const { password: _, ...rest } = newUser;
    return NextResponse.json({
      user: rest,
      message: "User created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      user: null,
      message: "Error creating user",
      status: 500,
    });
  }
}
