"use client"; 
import * as React from "react";
import { useState, useEffect } from "react";
import { CardWithForm } from "./card";
import {PieChartShow} from "./piechart";

export default function Page() {
  const [movieCount, setMovieCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [movieNCount, setMovieNCount] = useState(null);
  const [latestUserName, setLatestUserName] = useState(null);

  useEffect(() => {
    // Fetch all the required data from the API on component mount
    const fetchData = async () => {
      try {
        const response = await fetch('/api/overview'); // Your API endpoint
        const data = await response.json();

        setMovieCount(data.movieCount); // Update state with movie count
        setUserCount(data.userCount); // Update state with user count
        setMovieNCount(data.movieNCount); // Update state with movie_n count
        setLatestUserName(data.latestUserName); // Update state with latest user name
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after the first render

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <CardWithForm title="Total Movies" className="bg-green-300" content={movieCount} />
      <CardWithForm title="Total Users" className="bg-orange-300" content={userCount} />
      <CardWithForm title="Total Adding Movies" className="bg-purple-300" content={movieNCount} />
      <CardWithForm title="Fresh User" className="bg-blue-300" content={latestUserName} />
      <div className="w-[800px] h-[800px]  flex-wrap justify-start gap-4 p-4"><PieChartShow/>
      </div>
    </div>

    
  );
}
