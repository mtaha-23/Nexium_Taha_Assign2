// lib/saveToSupabase.ts
 
export async function saveToSupabase(url: string, summary: string) {
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/summaries`, {
    method: "POST",
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      url,
      summary,
      created_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    console.error("Supabase Error:", await res.text());
    throw new Error("Failed to save to Supabase");
  }
}
