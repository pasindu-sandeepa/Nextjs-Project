import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET function to retrieve users
export async function GET() {
  try {
    const client = await clientPromise;
    const database = client.db("sample_mflix"); // Replace with your actual database name

    const users = await database
      .collection("user") // Ensure the collection name is correct (e.g., "user")
      .find()
      .toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Failed to fetch users." }, { status: 500 });
  }
}

// DELETE function to remove a user by ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id"); // Get the user ID from the query string

    console.log("Attempting to delete user with ID:", userId); // Debugging Log

    // Validate the user ID format
    if (!userId || !ObjectId.isValid(userId)) {
      console.error("Invalid User ID:", userId);
      return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const database = client.db("sample_mflix"); // Replace with your actual database name

    // Start a session for transaction
    const session = client.startSession();

    // Start a transaction
    session.startTransaction();

    try {
      // Delete the user from the user collection
      const deleteUserResult = await database
        .collection("user") // Ensure the collection name is correct (e.g., "user")
        .deleteOne({ _id: new ObjectId(userId) }, { session });

      if (deleteUserResult.deletedCount === 0) {
        console.error("User not found:", userId);
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      // Delete the related account from the account collection
      const deleteAccountResult = await database
        .collection("account") // Ensure this is the correct collection name (e.g., "account")
        .deleteOne({ userId: new ObjectId(userId) }, { session });

      if (deleteAccountResult.deletedCount === 0) {
        console.error("Account for user not found:", userId);
        return NextResponse.json({ message: "Account not found for user" }, { status: 404 });
      }

      // Commit the transaction
      await session.commitTransaction();

      console.log("User and account deleted successfully:", userId);
      return NextResponse.json({ message: "User and account deleted successfully!" }, { status: 200 });
    } catch (error) {
      // Abort the transaction in case of error
      await session.abortTransaction();
      console.error("Error during deletion:", error);
      return NextResponse.json({ message: "Failed to delete user and account." }, { status: 500 });
    } finally {
      // End the session
      session.endSession();
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user." }, { status: 500 });
  }
}
