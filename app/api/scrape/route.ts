// app/api/scrape/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $("body").text().replace(/\s+/g, " ").trim();

    return NextResponse.json({ content: text.slice(0, 5000) }); // limit to 5000 chars if needed
  } catch (err) {
    console.error("Scrape error:", err);
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }
}
