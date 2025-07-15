// app/api/summarize/route.ts
 
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  console.log("📩 POST request received at /api/summarize");

  try {
    const { url, fullText } = await req.json();
    console.log("🧾 Received data:", { url, fullText });

    const client = await clientPromise;
    const db = client.db("nexium");
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      url,
      content: fullText,
      createdAt: new Date(),
    });

    console.log("✅ Inserted into MongoDB:", result.insertedId);

    return NextResponse.json({ success: true });
  } catch (error) {
  console.error("MongoDB Error:", error);
  return NextResponse.json({ error: "Failed to save", details: String(error) }, { status: 500 });
  }
}
