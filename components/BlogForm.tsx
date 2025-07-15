"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookOpen, Link2, Sparkles, Clock, TrendingUp, Brain, Zap, Target, CheckCircle } from "lucide-react"

const quickLinks = [
  {
    title: "Atomic Habits",
    description: "The complete guide to building good habits and breaking bad ones",
    url: "https://jamesclear.com/atomic-habits",
    icon: Brain,
    category: "Core Concepts",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "3-2-1 Newsletter",
    description: "Weekly insights on decision-making, continuous improvement, and human behavior",
    url: "https://jamesclear.com/3-2-1",
    icon: TrendingUp,
    category: "Newsletter",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Atomic Habits Summary",
    description: "Key takeaways and actionable insights from the bestselling book",
    url: "https://jamesclear.com/atomic-habits-summary",
    icon: BookOpen,
    category: "Summary",
    color: "from-blue-500 to-cyan-500",
  },
]

const features = [
  { icon: Zap, text: "Lightning-fast AI processing", delay: "0ms" },
  { icon: Target, text: "Extract key insights instantly", delay: "100ms" },
  { icon: CheckCircle, text: "Actionable takeaways", delay: "200ms" },
  { icon: Clock, text: "Save 80% reading time", delay: "300ms" },
]

// Custom components to replace shadcn/ui
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
)

const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  variant?: "default" | "secondary" | "outline"
  className?: string
}) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
  const variantClasses = {
    default: "bg-gray-900 text-gray-50",
    secondary: "bg-gray-100 text-gray-900",
    outline: "border border-gray-200 text-gray-900",
  }

  return <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>{children}</span>
}

const Button = ({
  children,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: {
  children: React.ReactNode
  type?: "button" | "submit"
  disabled?: boolean
  onClick?: () => void
  className?: string
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 ${className}`}
  >
    {children}
  </button>
)

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    disabled={disabled}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
)

const Separator = ({ className = "" }: { className?: string }) => (
  <div className={`shrink-0 bg-gray-200 h-[1px] w-full ${className}`} />
)

export default function BlogForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      setIsLoading(true)
      try {
        await onSubmit(url)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleQuickLink = async (linkUrl: string) => {
    setUrl(linkUrl)
    setIsLoading(true)
    try {
      await onSubmit(linkUrl)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Compact Hero Section */}
        <div
          className={`text-center mb-8 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg animate-pulse">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3 animate-fade-in">
            AI Blog Summarizer
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed mb-4">
            Transform lengthy blog posts into concise, actionable summaries in seconds.
          </p>

          {/* Animated Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: feature.delay }}
                >
                  <Badge variant="secondary" className="px-3 py-1.5 hover:bg-blue-100 transition-colors cursor-default">
                    <IconComponent className="h-3 w-3 mr-1.5" />
                    {feature.text}
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Main Form Section - Takes more space */}
          <div className="lg:col-span-3">
            <Card
              className={`shadow-xl border-0 bg-white/90 backdrop-blur-sm transform transition-all duration-700 hover:shadow-2xl ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-blue-600 animate-bounce" />
                  Enter Blog URL
                </CardTitle>
                <CardDescription>Paste any blog URL and get intelligent insights instantly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <Input
                      type="url"
                      placeholder="https://example.com/blog-post"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      className="h-11 text-base border-2 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300"
                      disabled={isLoading}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading || !url.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                        Generate Summary
                      </>
                    )}
                  </Button>
                </form>

                {/* Recent Activity Simulation */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-sm text-green-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Live Activity:</span>
                    <span className="animate-fade-in">247 summaries generated today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compact Quick Links Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card
              className={`shadow-xl border-0 bg-white/90 backdrop-blur-sm transform transition-all duration-700 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                  Quick Links
                </CardTitle>
                <CardDescription className="text-sm">Popular James Clear articles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <div
                      key={index}
                      className={`transform transition-all duration-500 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: `${600 + index * 100}ms` }}
                    >
                      <button
                        onClick={() => handleQuickLink(link.url)}
                        disabled={isLoading}
                        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-transparent hover:shadow-lg transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-1.5 bg-gradient-to-r ${link.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-700 transition-colors">
                                {link.title}
                              </h3>
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                {link.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{link.description}</p>
                          </div>
                        </div>
                      </button>
                      {index < quickLinks.length - 1 && <Separator className="mt-3 opacity-50" />}
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Compact Stats Card */}
           
          </div>
        </div>

        {/* Floating Action Indicators */}
        <div className="fixed bottom-6 right-6 space-y-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg animate-bounce">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes count-up {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-count-up {
          animation: count-up 0.8s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
