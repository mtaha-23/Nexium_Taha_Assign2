// lib/scrape.ts

import * as cheerio from "cheerio"
import fetch from "node-fetch"

export async function scrapeBlogText(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

    const html = await response.text()
    const $ = cheerio.load(html)

    // Remove unwanted/hidden content
    $("header, footer, nav, aside, script, style, noscript").remove()
    $("[style*='display:none']").remove()
    $("[aria-hidden='true']").remove()

    const selectors = ["article", "main", ".post", ".content", ".blog-content", ".entry-content"]
    let content = ""

    for (const selector of selectors) {
      if ($(selector).length) {
        content = $(selector).text()
        break
      }
    }

    if (!content || content.length < 100) {
      const paragraphs: string[] = []
      $("p").each((_, el) => {
        const text = $(el).text().trim()
        if (text.length > 50 && !text.match(/(sign up|subscribe|404|menu|read more|cookies|Medium Logo|terms)/i)) {
          paragraphs.push(text)
        }
      })
      content = paragraphs.slice(0, 12).join("\n\n")
    }

    content = content.replace(/\s{2,}/g, " ").trim()

    if (!content || content.length < 50) {
      throw new Error("No valid blog content found.")
    }

    return content
  } catch (error) {
    console.error("Scraping failed:", error)
    return "Failed to extract meaningful blog content."
  }
}

export async function scrapeBlogTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

    const html = await response.text()
    const $ = cheerio.load(html)

    const ogTitle = $("meta[property='og:title']").attr("content")
    if (ogTitle) return ogTitle.trim()

    const pageTitle = $("title").text().trim()
    if (pageTitle) return pageTitle

    for (const selector of ["h1", "h2", "h3"]) {
      const heading = $(selector).first().text().trim()
      if (heading) return heading
    }

    return "No title found"
  } catch (error) {
    console.error("Title scraping failed:", error)
    return "Failed to extract blog title."
  }
}
export async function scrapeBlogImage(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)

    const html = await response.text()
    const $ = cheerio.load(html)

    const ogImage = $("meta[property='og:image']").attr("content")
    if (ogImage) return ogImage

    const imgSrc = $("img").first().attr("src")
    if (imgSrc) return imgSrc

    return "No image found"
  } catch (error) {
    console.error("Image scraping failed:", error)
    return "Failed to extract blog image."
  }
}