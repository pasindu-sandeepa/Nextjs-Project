"use client"; // Mark this as a client component

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import UserTable from "./user_table";  

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>View and manage all the users' entries</CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable />  
      </CardContent>
    </Card>
  );
}
