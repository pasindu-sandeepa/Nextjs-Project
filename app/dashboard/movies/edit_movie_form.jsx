import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "../../../components/multi_select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Import the toast hook

const genresList = [
  { label: "Action", value: "action" },
  { label: "Comedy", value: "comedy" },
  { label: "Drama", value: "drama" },
  { label: "Horror", value: "horror" },
  { label: "Sci-Fi", value: "sci-fi" },
  { label: "Thriller", value: "thriller" },
  { label: "Romance", value: "romance" },
  { label: "Adventure", value: "adventure" },
];

const ratingsList = ["G", "PG", "PG-13", "R", "NC-17"];

const EditMovieForm = ({ movie, onClose }) => {
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    plot: "",
    genres: [], // Initialize genres as an empty array
    rated: "",
    actorName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const { toast } = useToast(); // Initialize the toast hook

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        year: movie.year || "",
        plot: movie.plot || "",
        genres: movie.genres || [], // Ensure genres are set correctly
        rated: movie.rated || "",
        actorName: movie.actorName || "",
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenresChange = (selectedGenres) => {
    setFormData((prev) => ({ ...prev, genres: selectedGenres })); // Update genres
  };

  const handleRatedChange = (value) => {
    setFormData((prev) => ({ ...prev, rated: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/movies?id=${movie._id}`, {
        method: "PUT", // Using PUT for updating movie details
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message || "Failed to update movie.");
      }

      // Show success toast
      toast({
        variant: "success",
        title: "Movie Updated Successfully!",
        description: `The movie "${formData.title}" has been updated.`,
        duration: 5000,
      });

      console.log("Movie updated successfully.");
      setIsLoading(false);
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error updating movie:", error);

      // Show error toast
      toast({
        variant: "destructive",
        title: "Failed to Update Movie",
        description:
          error.message ||
          "There was an issue updating the movie. Please try again.",
        duration: 5000,
      });

      setIsLoading(false);
    }
  };

  const handleReset = () => {
    // Reset the form fields to their initial state
    formRef.current.reset();

    // Reset the formData state to its initial state
    setFormData({
      title: "",
      year: "",
      plot: "",
      genres: [], // Clear genres selection
      rated: "",
      actorName: "",
    });
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit} ref={formRef}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Movie Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the movie title"
                required
              />
            </div>
            <div>
              <Label htmlFor="year">Movie Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter the movie year"
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            <div>
              <Label htmlFor="plot">Movie Plot</Label>
              <Textarea
                id="plot"
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                placeholder="Enter the movie plot"
                required
                minLength={10}
              />
            </div>
            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select movie genres"
                onValueChange={setGenres}
              />
            </div>
            <div>
              <Label htmlFor="rated">Movie Rated</Label>
              <Select onValueChange={handleRatedChange} value={formData.rated}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratingsList.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="w-full justify-end space-x-2">
            <Button type="reset" variant="outline" onClick={handleReset}>
              Clear Form
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin mr-2" />}Save
              Changes
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMovieForm;
