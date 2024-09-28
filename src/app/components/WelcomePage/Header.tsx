import Link from "next/link"
import { Mountain } from "lucide-react"

export default function Header() {
    return (
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
    )
} 