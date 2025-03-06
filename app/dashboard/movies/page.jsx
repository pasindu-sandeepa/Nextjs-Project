"use client"; // Mark this as a client component

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Suspense } from "react";

// Use Next.js dynamic import with ssr: false to enable lazy loading
import dynamic from 'next/dynamic';

const MovieTable = dynamic(() => import("./movie_table"), {
  ssr: false,  // Disable SSR for this component to allow client-side rendering
  loading: () => <div>Loading Movies...</div>  // Optional loading state
});

export default function MoviesPage() {
  return (
    <>
      <div className="space-y-4 mb-4">
        <div className="flex justify-end">
          <Link href="/movies">
            <Button variant="outline" className="flex items-center gap-2">
              <Eye size={16} /> View as User
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movie Management</CardTitle>
          <CardDescription>View and manage all the listed movie entries</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Suspense is now not needed as we are handling loading with dynamic */}
          <MovieTable />
        </CardContent>
      </Card>
    </>
  );
}
