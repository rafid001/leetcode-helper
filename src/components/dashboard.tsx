'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Mountain, List, Grid, ArrowRight } from "lucide-react"
import Link from 'next/link'

export function DashboardComponent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    // Here you would typically navigate to the selected view or update the UI
    console.log(`Selected option: ${option}`)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzE3MTcxNyI+PC9yZWN0Pgo8cGF0aCBkPSJNMzAgMzBMNjAgNjBIMEwzMCAzMHoiIGZpbGw9IiMxYTFhMWEiPjwvcGF0aD4KPC9zdmc+')] opacity-5"></div>
      </div>

      {/* Header */}
      <header className="w-full py-6 px-6 border-b border-gray-800 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold">CodePeak</span>
          </Link>
          <nav className="hidden sm:flex space-x-6">
            <Link href="/about" className="text-sm hover:text-gray-300 transition-colors">About</Link>
            <Link href="/features" className="text-sm hover:text-gray-300 transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm hover:text-gray-300 transition-colors">Pricing</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome to Your Dashboard</h1>
            <p className="text-gray-400 text-lg">Choose how you'd like to view your submissions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleOptionSelect('all')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <List className="h-6 w-6" />
                  <span>All Submissions</span>
                </CardTitle>
                <CardDescription>View a comprehensive list of all your LeetCode submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Get a chronological view of your coding journey</p>
                <Button variant="link" className="mt-4 p-0 h-auto text-white">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleOptionSelect('category')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Grid className="h-6 w-6" />
                  <span>Category-wise Submissions</span>
                </CardTitle>
                <CardDescription>Explore your submissions organized by problem categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">Analyze your performance across different problem types</p>
                <Button variant="link" className="mt-4 p-0 h-auto text-white">
                  Explore Categories <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {selectedOption && (
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-300">
                You selected: <span className="font-semibold">{selectedOption === 'all' ? 'All Submissions' : 'Category-wise Submissions'}</span>
              </p>
              {/* Here you would typically render the selected view or navigate to a new page */}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-6 px-6 border-t border-gray-800 relative z-10">
        <div className="container mx-auto flex justify-between text-gray-500 text-xs">
          <span>© 2023 CodePeak</span>
          <span>Powered by AI</span>
        </div>
      </footer>
    </div>
  )
}