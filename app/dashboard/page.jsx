import { getMovies } from "../../lib/server";
import { Badge } from "@/components/ui/badge";

// Define Card components directly in the file
function Card({ children }) {
  return <div className="bg-white shadow-md rounded-lg h-full">{children}</div>;
}

function CardHeader({ children }) {
  return <div className="p-4 bg-blue-600 border-b">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="p-4 flex-grow">{children}</div>;
}

function CardDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}

function CardFooter({ children }) {
  return <div className="p-4 border-t">{children}</div>;
}

export default async function DashboardPage() {
  const moviesQuery = await getMovies();
  console.log("movie", moviesQuery);

  return (
 
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {moviesQuery?.length &&
            moviesQuery.map((movie) => (
              <div key={movie?._id} className="h-96">
                <Card>
                  <CardHeader>
                    <CardTitle>{movie?.title} ({movie?.year})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{movie?.plot}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <div>
                      <p className="font-medium">Category: {movie?.genres ?? "Unknown"}</p>
                    </div >
                    <div className="flex justify-between mt-9 ">
                    <Badge variant="success" className="font-medium bg-green-800">
                  Rated: {movie?.rated ?? "N/A"}
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