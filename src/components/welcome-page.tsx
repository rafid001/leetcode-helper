'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Code, Mountain } from "lucide-react"
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'

export function WelcomePage() {
  const [username, setUsername] = useState('')
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    })
  }, [controls])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted username:', username)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-6 border-b border-gray-800">
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
      <main className="flex-grow flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 z-0 opacity-50">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5">
                <animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate>
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.05)"></stop>
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"></stop>
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#Gradient1)">
              <animate attributeName="x" dur="20s" values="0%;25%;0%" repeatCount="indefinite" />
              <animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 z-10"
        >
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              CodePeak
            </motion.h1>
            <motion.p 
              className="text-gray-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Elevate your coding journey
            </motion.p>
          </div>
          
          <motion.div 
            className="flex justify-center space-x-6 my-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div animate={controls}>
              <Code className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div animate={controls}>
              <Mountain className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="mt-12 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="relative">
              <Input
                type="text"
                required
                className="w-full pl-4 pr-12 py-3 bg-gray-900 border-2 border-gray-800 rounded-lg focus:ring-2 focus:ring-white text-white placeholder-gray-500 transition-all"
                placeholder="Your LeetCode Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button 
                type="submit" 
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200 rounded-md transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.form>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p className="text-sm text-gray-500">
              Analyze. Categorize. Optimize. Reach your coding summit.
            </p>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-6 px-6 border-t border-gray-800">
        <div className="container mx-auto flex justify-between text-gray-500 text-xs">
          <span>© 2023 CodePeak</span>
          <span>Powered by AI</span>
        </div>
      </footer>
    </div>
  )
}