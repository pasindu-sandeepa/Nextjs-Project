import { NextRequest,NextResponse } from "next/server";

export const POST = async (req) => {
    const request = await req.json();
    console.log("REQUEST", request);


   //Bind database



   


    return NextResponse.json({success: true, username: "pasindu"});
    };