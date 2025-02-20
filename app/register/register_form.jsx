"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { registerUser } from "@/lib/server"; // Import the registerUser function
import { signUp } from "@/lib/auth-client"; // Import the signUp function

const DEFAULT_ERROR = {
    error: false,
    message: ""
};

//Keep this as a client component(functional component)
export default function RegisterForm() {
    const [error, setError] = useState(DEFAULT_ERROR);
    const [isLoading, setLoading] = useState(false);
    const { toast } = useToast();
    const formRef = useRef(null);

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(DEFAULT_ERROR);
        console.log("Form is being submitted"); // Debugging statement
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") ?? "";
        const email = formData.get("email") ?? "";
        const password = formData.get("password") ?? "";
        const confirmPassword = formData.get("confirm-password") ?? "";

        if (name && email && password && confirmPassword) {
            if (password.length < 6) {
                setError({ error: true, message: "Password must be at least 6 characters long" });
                setLoading(false);
            } else if (password !== confirmPassword) {
                setError({ error: true, message: "Passwords do not match" });
                setLoading(false);
            } else {
                console.log("Form submitted", { name, email, password, confirmPassword });
                setError(DEFAULT_ERROR);

                // Commented out the existing validation code
                /*
                // Send data to the API endpoint using registerUser function
                const result = await registerUser({ name, email, password });

                if (!result.error) {
                    console.log("User registered successfully", result);
                    toast({
                        variant: "success",
                        title: "Registration successful!!",
                        description: "Please continue with login",
                        action: <ToastAction altText="login" className="hover:bg-white/90">Login</ToastAction>,
                    });
                    formRef.current.reset(); // Clear the form
                } else {
                    setError({ error: true, message: result.message });
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                }
                */

                // New validation code using signUp function
                const { data, error } = await signUp.email({
                    email: email,
                    password: password,
                    name: name,
                    image: undefined,
                }, {
                    onRequest: () => {
                        // Handle request
                    },
                    onSuccess: (ctx) => {
                        console.log("onSuccess", ctx);
                        toast({
                            variant: "success",
                            title: "Registration successful!!",
                            description: "Please continue with login",
                            action: <ToastAction altText="login" className="hover:bg-white/90">Login</ToastAction>,
                        });
                        formRef.current.reset(); // Clear the form
                    },
                });

                if (error) {
                    setError({ error: true, message: error.message });
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                }

                setLoading(false);
            }
        } else {
            setError({ error: true, message: "All fields are required" });
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-[500px]">
                <form ref={formRef} onSubmit={handleSubmitForm} className="space-y-6">
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
                        <Button type="submit" className="bg-blue-500 hover:bg-green-500 focus:ring-2 font-medium focus:ring-blue-300 text-white w-full p-2.5 rounded-lg" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" />}
                            {!isLoading && "Register"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}