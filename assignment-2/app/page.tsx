// app/page.tsx
"use client"

import BlogForm from "@/components/BlogForm"
import { useState } from "react"
import { saveToSupabase } from "@/lib/saveToSupabase"
import { scrapeBlogText } from "@/lib/scrape"
import { generateSummary } from "@/lib/summarize"
import { translateToUrdu } from "@/lib/translate"

export default function Home() {
  const [summary, setSummary] = useState("")
  const [translated, setTranslated] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (url: string) => {
    setLoading(true)

    try {
      const blogText = await scrapeBlogText(url)

      await fetch("/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, fullText: blogText }),
    });


      // Generate summary and translation
      const summary = await generateSummary(blogText)
      const urdu = await translateToUrdu(summary)

      // Save summary to Supabase
      await saveToSupabase(url, summary)

      // Set UI state
      setSummary(summary)
      setTranslated(urdu)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Blog Summariser</h1>
      <BlogForm onSubmit={handleSubmit} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {summary && (
        <div className="mt-8 space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl font-semibold">Summary:</h2>
          <p className="bg-gray-100 p-4 rounded">{summary}</p>
          <h2 className="text-xl font-semibold">Translation (Urdu):</h2>
          <p className="bg-gray-100 p-4 rounded font-noto">{translated}</p>
        </div>
      )}
    </main>
  )
}
