"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const DEFAULT_ERROR = {
    error: false,
    message: ""
};

//Keep this as a client component(functional component)
export default function RegisterForm() {
    const [error, setError] = useState(DEFAULT_ERROR);

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log("Form is being submitted"); // Debugging statement
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") ?? "";
        const email = formData.get("email") ?? "";
        const password = formData.get("password") ?? "";
        const confirmPassword = formData.get("confirm-password") ?? "";
        console.log("Form submitted", { name, email, password, confirmPassword });

        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                setError(DEFAULT_ERROR);
            } else {
                setError({ error: true, message: "Passwords do not match" });
            }
        } else {
            setError({ error: true, message: "All fields are required" });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-[500px]">
                <form onSubmit={handleSubmitForm} className="space-y-6">
                    <h3 className="text-center text-xl font-bold text-blue-500">
                        Create an account
                    </h3>
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Name</Label>
                        <Input type="text" id="name" name="name" placeholder="John Doe" className="bg-gray-100 border-gray-500 ring-1 ring-offset-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg" />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="John@example.com" className="bg-gray-100 border-gray-500 ring-1 ring-offset-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg" />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Password</Label>
                        <Input type="password" id="password" name="password" placeholder="Enter new Password" className="bg-gray-100 border-gray-500 ring-1 ring-offset-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg" />
                    </div>
                    <div>
                        <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-900 block mb-2">Confirm Password</Label>
                        <Input type="password" id="confirm-password" name="confirm-password" placeholder="Enter Password again to confirm" className="bg-gray-100 border-gray-500 ring-1 ring-offset-1 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg" />
                    </div>
                    {error.error && (
                        <div className="text-red-500 text-sm">
                            {error.message}
                        </div>
                    )}
                    <div className="flex justify-center space-x-1 gap-1 text-xs">
                        Already have an account? <Link href="/login" className="text-blue-700 font-semibold hover:text-blue-800">Login</Link>
                    </div>
                    <div>
                        <Button type="submit" className="bg-blue-500 hover:bg-green-500 focus:ring-2 font-medium focus:ring-blue-300 text-white w-full p-2.5 rounded-lg">
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}