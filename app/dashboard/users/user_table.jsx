import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Import the Button component
import { Trash2 } from "lucide-react"; // Import Trash2 icon for delete button
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { ToastAction } from "@/components/ui/toast"; // Import ToastAction component

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const { toast } = useToast(); // Access the toast function

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");  // Call the API endpoint to fetch users
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      // Show success toast with a "View Movies" action
      toast({
        title: "User deleted successfully!",
        description: "The user has been removed.",
        action: (
          <ToastAction
            altText="View Movies"
            className="hover:bg-white/90"
            onClick={() => window.location.reload()} // Reload the page
          >
            View Movies
          </ToastAction>
        ),
      });
    } else {
      // Show error toast
      toast({
        title: "Failed to delete user",
        description: `Error: ${data.message || "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Toast notifications container */}
      <div>
        <Table>
          <TableCaption>A list of users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Actions</TableHead> {/* Column for actions */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}> {/* Assuming _id is the unique identifier */}
                <TableCell>{user.name}</TableCell> {/* Adjust field names as per your data */}
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>  </TableCell> {/* Adjust the date format as needed */}
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user._id)} // Call handleDelete with user ID
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
