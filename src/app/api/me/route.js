import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Phiphatphong Kawindong",
    studentId: "650610792",
  });
};
