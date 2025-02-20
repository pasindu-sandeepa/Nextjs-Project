import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { v4 as uuidv4 } from 'uuid';


export const POST = async (req) => {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email and password are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const database = client.db("sample_mflix");
        const newUsersCollection = database.collection("new_users"); // New collection

        const existingUser = await newUsersCollection.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        const userId = uuidv4(); // Generate a unique ID

        const result = await newUsersCollection.insertOne({
            userId,
            name,
            email,
            password,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true, userId, name, email });
    } catch (error) {
        console.error("MongoDB Error", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
};