import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const RoomID = request.nextUrl.searchParams.get("roomId");
  readDB();
  const foundroomid = DB.messages.find((x) => x.roomId === RoomID);
  if(foundroomid === -1)
  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );


  return NextResponse.json(
    {
      ok: true,
      message: DB.messages,
    },
    { status: 200 }
  );

};

export const POST = async (request) => {
  const body = await request.json();
  const {roomD} = body;
  readDB();
  const foundMess = DB.messages.find((x) => x.roomId === roomD);
  if(foundMess === -1)  
  return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId: messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const body = await request.json();
  const payload = checkToken();
  const {messageId} = body;
  try {
    role = payload.role;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  readDB();

  const foundMessId = DB.messages.find((x) => x.messageId === messageId)
  if(!foundMessId)
  return NextResponse.json(
    {
      ok: false,
      message: "Message is not found",
    },
    { status: 404 }
  );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
