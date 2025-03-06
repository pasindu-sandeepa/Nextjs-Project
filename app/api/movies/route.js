import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createMovie } from "@/lib/actions/movie";

export async function POST(request) {
  try {
    const movieData = await request.json();
    console.log("Received movie data:", movieData); // Log the data

    await createMovie(movieData);
    return NextResponse.json(
      { message: "Movie added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding movie:", error);
    return NextResponse.json(
      { message: "Failed to add movie." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    console.log("Connected to MongoDB");

    const database = client.db("sample_mflix");
    console.log("Selected database:", database.databaseName);

    const movies = await database
      .collection("movies_n")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    console.log("Fetched movies:", movies);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("MongoDB Error", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Combined handler for both GET and POST
export async function handler(request) {
  switch (request.method) {
    case "GET":
      return GET(request);
    case "POST":
      return POST(request);
    default:
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
  }
}