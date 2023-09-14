import jwt from "jsonwebtoken";

import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";


export const POST = async (request) => {
  const body = await request.json(); 
  readDB();
  const { userN, passW } = body;

  const foundUser = DB.users.find((x) => (x.username !== userN)||(x.password !== passW));
  if(foundUser){
    return NextResponse.json(
      {
        ok: false,
        message: "Username or Password is incorrect",
      },
      { status: 400 }
    );
    }

    const token = jwt.sign({
      username: foundUser.username,
    },
      process.env.JWT_SECRET,
    );

  return NextResponse.json({ ok: true, token });
};
