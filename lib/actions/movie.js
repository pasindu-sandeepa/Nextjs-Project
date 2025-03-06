"use server";
import clientPromise from "@/lib/mongodb";

export const createMovie = async (movie) => {
  try {
    const client = await clientPromise; // No parentheses here
    console.log("Connected to MongoDB"); // Log connection status

    const db = client.db("sample_mflix");
    const result = await db.collection("movies_n").insertOne(movie);

    if (!result.insertedId) {
      throw new Error("Failed to insert movie.");
    }

    console.log(`A movie was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.error("MongoDB insert failed:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};