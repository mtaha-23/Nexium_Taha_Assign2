"use client"

import BlogForm from "@/components/BlogForm"
import { useState } from "react"
import { saveToSupabase } from "@/lib/saveToSupabase"
import { generateSummary } from "@/lib/summarize"
import { translateToUrdu } from "@/lib/translate"

export default function Home() {
  const [summary, setSummary] = useState("")
  const [translated, setTranslated] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (url: string) => {
    setLoading(true)
    try {
      // Call API route to scrape blog text
      const scrapeRes = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })
      const scrapeData = await scrapeRes.json()
      const blogText = scrapeData.content

      // Save raw blog content to MongoDB via API
      await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, fullText: blogText }),
      })

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Pass loading state to BlogForm so it can show loading UI */}
      <BlogForm onSubmit={handleSubmit} />

      {/* Results Section - Only show when we have results */}
      {(summary || translated) && (
        <div className="container mx-auto px-4 pb-12 max-w-4xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border-0 p-8 transform transition-all duration-500 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                📝 Summary Results
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8">
              {summary && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                      <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">English Summary</h3>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
                  </div>
                </div>
              )}

              {translated && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">اردو ترجمہ (Urdu Translation)</h3>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <p className="text-gray-800 leading-relaxed font-noto text-right whitespace-pre-wrap" dir="rtl">
                      {translated}
                    </p>
                    <p className="mt-3 text-xs text-gray-500 text-left">
                      * Only words added in the dictionary are translated.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigator.clipboard.writeText(summary)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Summary
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(translated)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy Translation
              </button>
              <button
                onClick={() => {
                  setSummary("")
                  setTranslated("")
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                New Summary
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .font-noto {
          font-family: 'Noto Sans Urdu', sans-serif;
        }
      `}</style>
    </div>
  )
}
