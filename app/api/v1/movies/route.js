import { NextResponse } from "next/server";
import clientPromise from "../../../libs/mongodb";

export const GET = async (req) => {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    console.log("Connected to MongoDB");

    const database = client.db("sample_mflix");
    console.log("Selected database:", database.databaseName);

    const movies = await database
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
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
};