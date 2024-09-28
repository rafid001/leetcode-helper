'use client'

import { useState, useEffect } from 'react'
import { TopBar } from '@/components/TopBar'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { List, Grid, ArrowRight } from "lucide-react"
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'

export default function DashboardComponent() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    })
  }, [controls])

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    console.log(`Selected option: ${option}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="flex-grow flex flex-col items-center justify-start p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl space-y-12"
        >
          <div className="text-center mt-8">
            <motion.h1 
              className="text-5xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to Your Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Choose how you'd like to view your submissions
            </motion.p>
          </div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/all-submissions">
            <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleOptionSelect('all')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                  <List className="h-8 w-8 text-blue-400" />
                  <span>All Submissions</span>
                </CardTitle>
                <CardDescription className="text-gray-300">View a comprehensive list of all your LeetCode submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">Get a chronological view of your coding journey</p>
                <Button variant="link" className="mt-4 p-0 h-auto text-blue-400 hover:text-blue-300">
                  View All <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
            </Link>

            <Link href="/categories">
            <Card className="bg-gray-900 border-gray-700 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleOptionSelect('category')}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                  <Grid className="h-8 w-8 text-green-400" />
                  <span>Category-wise Submissions</span>
                </CardTitle>
                <CardDescription className="text-gray-300">Explore your submissions organized by problem categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">Analyze your performance across different problem types</p>
                <Button variant="link" className="mt-4 p-0 h-auto text-green-400 hover:text-green-300">
                  Explore Categories <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
            </Link>
          </motion.div>
          
          {selectedOption && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-300">
                You selected: <span className="font-semibold text-white">{selectedOption === 'all' ? 'All Submissions' : 'Category-wise Submissions'}</span>
              </p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}