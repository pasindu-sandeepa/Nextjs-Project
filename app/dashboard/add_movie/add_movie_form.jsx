"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "../../../components/multi_select";
import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";  // Import useToast
import { ToastAction } from "@/components/ui/toast"; // Import ToastAction

// Define the list of genres
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

// Define the list of ratings
const ratings = ["G", "PG", "PG-13", "R", "NC-17"];

export default function AddMovieForm() {
  const { toast } = useToast(); // Initialize useToast
  const [genres, setGenres] = useState([]);
  const [rated, setRated] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null); // Reference to form

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.genres = genres;
      data.rated = rated;
      data.year = parseInt(data.year, 10); // Convert year to number

      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save movie.");
      }

      const result = await response.json();

      // Show success toast notification
      toast({
        variant: "success",
        title: "Movie Added Successfully!",
        description: "The movie has been successfully added to the database.",
        action: (
          <ToastAction
            altText="View Movies"
            className="hover:bg-white/90"
            onClick={() => window.location.reload()} // Optional: Reload or navigate
          >
            View Movies
          </ToastAction>
        ),
      });

      // Clear form after success
      formRef.current.reset();
      setGenres([]);
      setRated("");

    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error toast notification
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem adding the movie.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Movie</CardTitle>
        <CardDescription>Add a movie to the Mflix database</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} ref={formRef}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Movie Title</Label>
            <Input
              id="title"
              name="title"
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
            <Select 
              onValueChange={(val) => setRated(val)}
              value={rated}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating}>
                    {rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="w-full justify-end space-x-2">
          <Button 
            type="reset" 
            variant="outline"
            onClick={() => {
              formRef.current.reset();
              setGenres([]);
              setRated("");
            }}
          >
            Clear Form
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin mr-2" />}
            Add Movie
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
