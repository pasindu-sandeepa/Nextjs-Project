import { NextResponse } from "next/server";

const MOVIES = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        rating: 9.3,
        genres: ["Drama"],
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        rating: 9.2,
        genres: ["Crime", "Drama"],
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genres: ["Action", "Crime", "Drama"],
    },
    {
        id: 1,
        title: "Mafia",
        year: 1997,
        rating: 9.8,
        genres: ["Action", "Crime", "Drama"],
    },
      {
        id: 5,
        title: "venem",
        year: 1997,
        rating: 9.8,
        genres: ["Action", "Crime", "Drama"],
    },
    
];
    

export const GET = async (req) => {
    return NextResponse.json({ sucess:true,movies: MOVIES });
    }