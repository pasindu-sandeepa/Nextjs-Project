import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";  // Import useToast
import { ToastAction } from "@/components/ui/toast"; // Import ToastAction

export default function DeleteMovie({ movie, onClose }) {
    const { toast } = useToast(); // Initialize toast
    const handleDelete = async () => {
        try {
            console.log("Deleting movie with ID:", movie._id); // Debugging Log
            
            const response = await fetch(`/api/movies?id=${movie._id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to delete movie.");
            }

            console.log("Movie deleted successfully.");

            // Show success toast with a delay
            toast({
                variant: "success",
                title: "Movie Deleted Successfully!",
                description: `The movie "${movie?.title}" has been deleted.`,
                action: (
                    <ToastAction
                        altText="View Movies"
                        className="hover:bg-white/90"
                        onClick={() => window.location.reload()} // Reload the page
                    >
                        View Movies
                    </ToastAction>
                ),
                duration: 5000, // Delay before the toast closes (in ms)
            });

            onClose(); // Close the dialog
            window.location.reload(); // Refresh page
        } catch (error) {
            console.error("Error deleting movie:", error);

            // Show error toast with a delay
            toast({
                variant: "destructive",
                title: "Failed to Delete Movie",
                description: "There was an issue deleting the movie. Please try again.",
                duration: 5000, // Delay before the toast closes (in ms)
            });

            alert("Failed to delete movie. Check console for details.");
        }
    };

    return (
        <AlertDialog open={true} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the movie: <strong>{movie?.title}</strong>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
