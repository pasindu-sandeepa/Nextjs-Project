import { createMovie } from "@/lib/actions/movie";

export async function POST(request) {
  try {
    const movieData = await request.json();
    console.log("Received movie data:", movieData); // Log the data

    await createMovie(movieData);
    return new Response(JSON.stringify({ message: "Movie added successfully!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error adding movie:", error);
    return new Response(JSON.stringify({ message: "Failed to add movie." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}