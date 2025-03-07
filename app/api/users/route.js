import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";  // MongoDB client connection
import { ObjectId } from "mongodb";  // MongoDB ObjectId to ensure valid deletion

// GET function to retrieve all users
export async function GET(request) {
  try {
    const client = await clientPromise;  // Connect to MongoDB
    const database = client.db("sample_mflix");  // Replace with your database name
    const users = await database
      .collection("user")  // The user collection
      .find({})
      .limit(20)  // Optional: Limit the number of users returned
      .toArray();  // Convert MongoDB cursor to an array

    return NextResponse.json(users);  // Return the data as JSON
  } catch (error) {
    console.error("MongoDB Error", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// DELETE function to remove a user by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;  // Extract user ID from URL parameters

    // Validate the ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    const client = await clientPromise;  // Connect to MongoDB
    const database = client.db("sample_mflix");  // Replace with your database name

    // Delete the user from the database using the provided ID
    const result = await database.collection("user").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("MongoDB Error", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
