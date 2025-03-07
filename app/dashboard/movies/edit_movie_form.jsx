"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "../../../components/multi_select";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

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
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    plot: "",
    genres: [],
    rated: "",
    actorName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        year: movie.year || "",
        plot: movie.plot || "",
        genres: movie.genres || [],
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
    setFormData((prev) => ({ ...prev, genres: selectedGenres }));
  };

  const handleRatedChange = (value) => {
    setFormData((prev) => ({ ...prev, rated: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log("Submitting movie data:", formData);

    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  const handleReset = () => {
    formRef.current.reset();
    setFormData({
      title: movie?.title || "",
      year: movie?.year || "",
      plot: movie?.plot || "",
      genres: movie?.genres || [],
      rated: movie?.rated || "",
      actorName: movie?.actorName || "",
    });
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
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
                value={formData.genres}
                placeholder="Select movie genres"
                onValueChange={handleGenresChange}
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
              {isLoading && <Loader2 className="animate-spin mr-2" />}Save Changes
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMovieForm;
