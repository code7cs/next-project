import { NextResponse } from "next/server";
import prisma from "../../../db/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, userName, password } = body;
        console.log("body", body);
        // check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Email already exists" }, { status: 409 });
        }

        // check if username already exists
        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                userName: userName
            }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "Username already exists" }, { status: 409 });
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                userName: userName,
                password: password
            }
        });

        return NextResponse.json({ user: newUser, message: "User created successfully", status: 201 });
    } catch (error) {
        return NextResponse.json({ user: null, message: "Error creating user", status: 500 });
    }
}