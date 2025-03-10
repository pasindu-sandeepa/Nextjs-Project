import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    console.log("Connected to MongoDB");

    const database = client.db("sample_mflix");
    console.log("Selected database:", database.databaseName);

    // Get the count of movies in the 'movies' collection
    const movieCount = await database.collection("movies").countDocuments();

    // Get the total number of users in the 'user' collection
    const userCount = await database.collection("user").countDocuments();

    // Get the count of movies in the 'movies_n' collection
    const movieNCount = await database.collection("movies_n").countDocuments();

    // Get the most recently registered user (assuming the user collection has a 'createdAt' field)
    const latestUser = await database.collection("user")
      .find({})
      .sort({ createdAt: -1 }) // Sort by creation date descending
      .limit(1)
      .toArray();

    const latestUserName = latestUser.length > 0 ? latestUser[0].name : "No users found";

    console.log("Number of movies:", movieCount);
    console.log("Total users:", userCount);
    console.log("Number of movies in 'movies_n':", movieNCount);
    console.log("Latest user:", latestUserName);

    return NextResponse.json({
      movieCount,
      userCount,
      movieNCount,
      latestUserName,
    });
  } catch (error) {
    console.error("MongoDB Error", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
