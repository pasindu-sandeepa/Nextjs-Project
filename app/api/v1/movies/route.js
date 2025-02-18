import { NextResponse } from "next/server";
import clientPromise from "../../../libs/mongodb";

export const GET = async (req) => {
  // Get movies from the mongoDB
  try {
    const client = await clientPromise();

    const database = client.db("sample_mflix");

    const movies = await database
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json(movies);
  } catch (error) {
    console.log("MongoDB Error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
