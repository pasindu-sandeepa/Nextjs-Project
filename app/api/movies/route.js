import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { createMovie } from "@/lib/actions/movie";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
      const movieData = await request.json();
      console.log("Received movie data:", movieData); // Debug Log

      await createMovie(movieData);
      return NextResponse.json({ message: "Movie added successfully!" }, { status: 200 });
  } catch (error) {
      console.error("Error adding movie:", error);
      return NextResponse.json({ message: "Failed to add movie." }, { status: 500 });
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
      return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

// DELETE function to remove a movie by ID
export async function DELETE(request) {
  try {
      const { searchParams } = new URL(request.url);
      const movieId = searchParams.get("id");

      console.log("Attempting to delete movie with ID:", movieId); // Debugging Log

      if (!movieId || !ObjectId.isValid(movieId)) {
          console.error("Invalid Movie ID:", movieId);
          return NextResponse.json({ error: "Invalid Movie ID" }, { status: 400 });
      }

      const client = await clientPromise;
      const database = client.db("sample_mflix");

      const result = await database
          .collection("movies_n")
          .deleteOne({ _id: new ObjectId(movieId) });

      if (result.deletedCount === 0) {
          console.error("Movie not found:", movieId);
          return NextResponse.json({ message: "Movie not found" }, { status: 404 });
      }

      console.log("Movie deleted successfully:", movieId);
      return NextResponse.json({ message: "Movie deleted successfully!" }, { status: 200 });
  } catch (error) {
      console.error("Error deleting movie:", error);
      return NextResponse.json({ message: "Failed to delete movie." }, { status: 500 });
  }
}

// Combined handler for GET, POST, and DELETE
export async function handler(request) {
  switch (request.method) {
      case "GET":
          return GET(request);
      case "POST":
          return POST(request);
      case "DELETE":
          return DELETE(request);
      default:
          return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}