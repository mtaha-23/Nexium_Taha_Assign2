// lib/saveToMongo.ts

import clientPromise from "@/lib/mongodb";

export async function saveToMongo(url: string, fullText: string) {
  try {
    const client = await clientPromise;
    const db = client.db("nexium");
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      url,
      content: fullText,
      createdAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    throw new Error("Failed to save to MongoDB");
  }
}
