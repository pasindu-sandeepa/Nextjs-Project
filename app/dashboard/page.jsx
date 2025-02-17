import { getMovies } from "../libs/apis/server";

export default async function DashboardPage() {
  // 1.add shadcn card
  // 2. create movies get endpoint
  // 3. read the dummy response
  // 4. render dataset in ui

  const { movies } = await getMovies();

  return (
    <main>
      {/* Navbar */}
      <div className="bg-blue-400 w-full h-16 flex px-4 justify-start items-center">
        <div className="container mx-auto">
          <h1 className="text-white font-bold text-xl">Dashboard</h1>
        </div>
      </div>

      <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
          {movies?.length &&
            movies.map((movie) => (
              <div key={movie.id} className="h-96 bg-blue-400">
                {movie.title}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
