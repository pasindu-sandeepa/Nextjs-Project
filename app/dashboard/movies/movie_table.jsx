"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import EditMovieForm from "./edit_movie_form";  // Ensure this path is correct
import DeleteMovie from "./delete_movie";  

const MoviesTable = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/api/movies");
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setIsDeleteDialogOpen(true);
  };

  const handleEditClick = (movie) => {
    setSelectedMovie(movie);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="overflow-x-auto p-4">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold"># Cover</TableHead>
            <TableHead className="font-bold">Movie Title</TableHead>
            <TableHead className="font-bold">Year</TableHead>
            <TableHead className="font-bold">Rated</TableHead>
            <TableHead className="font-bold">Genres</TableHead>
            <TableHead className="font-bold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.movie_id}>
              <TableCell>URL</TableCell>
              <TableCell>{movie?.title ?? "N/A"}</TableCell>
              <TableCell>{movie?.year ?? "N/A"}</TableCell>
              <TableCell>{movie?.rated ?? "N/A"}</TableCell>
              <TableCell>{movie?.genres?.join(", ") ?? "N/A"}</TableCell>
              <TableCell className="flex justify-end space-x-2 sm:flex-nowrap flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="min-w-[120px] px-4 py-2"
                  onClick={() => handleEditClick(movie)}
                >
                  <Edit size={16} /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="min-w-[120px] bg-red-500 text-white hover:bg-red-600 px-4 py-2"
                  onClick={() => handleDeleteClick(movie)}
                >
                  <Trash2 size={16} /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isEditDialogOpen && selectedMovie && (
        <EditMovieForm
          movie={selectedMovie}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}
      
      {isDeleteDialogOpen && selectedMovie && (
        <DeleteMovie
          movie={selectedMovie}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default MoviesTable;
