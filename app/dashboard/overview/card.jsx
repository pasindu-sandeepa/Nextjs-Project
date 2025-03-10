"use client"; // This tells Next.js to treat this component as a client-side component

import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function CardWithForm({ title, className, content }) {
  return (
   
    <Card className={`w-[400px] h-[200px] ${className}`}>
      <CardContent>
        <span style={{ fontSize: "50px" }}>
          {content !== null ? content : "Loading..."}
        </span>
      </CardContent>
      <CardFooter className="font-semibold text-center">{title}</CardFooter>
    </Card>
    
  );
}
