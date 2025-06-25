import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const file = formData.get("file") as File;

  const userId = formData.get("userId") as string;

  console.log(file);

  return NextResponse.json({ ok: true });
};
