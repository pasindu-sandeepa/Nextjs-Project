"use client"; // Mark this as a client component

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

// Define Card components directly in the file
function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="p-4 bg-blue-600 border-b">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-bold text-white">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="p-4 flex-grow overflow-y-auto">{children}</div>;
}

function CardDescription({ children }) {
  return <p className="text-gray-600 line-clamp-4">{children}</p>; // Limit to 4 lines
}

function CardFooter({ children }) {
  return <div className="p-4 border-t">{children}</div>;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from the API route
  const fetchMovies = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie._id} className="h-96">
            <Card>
              <CardHeader>
                <CardTitle>
                  {movie.title} ({movie.year})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{movie.plot}</CardDescription>
              </CardContent>
              <CardFooter>
                <div>
                  <p className="font-medium">Category:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.genres?.map((genre, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-9">
                  <Badge variant="success" className="font-medium bg-green-800">
                    Rated: {movie.rated ?? "N/A"}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
