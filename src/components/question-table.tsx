'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ExternalLink } from "lucide-react"

// Define the structure of a question item
interface QuestionItem {
  id: string
  title: string
  link: string
  category: string
}

// Define the props for the QuestionTable component
interface QuestionTableProps {
  questions: QuestionItem[]
  onCategoryChange: (questionId: string, newCategory: string) => void
}

export function QuestionTableComponent({ questions, onCategoryChange }: QuestionTableProps) {
  // Define category options
  const categories = [
    "Array", "String", "Hash Table", "Dynamic Programming", "Math",
    "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database",
    "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Bit Manipulation"
  ]

  return (
    <div className="w-full overflow-auto">
      <Table className="w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-gray-900">
            <TableHead className="w-1/2 p-2 text-left font-semibold text-gray-300">Question</TableHead>
            <TableHead className="w-1/4 p-2 text-left font-semibold text-gray-300">Link</TableHead>
            <TableHead className="w-1/4 p-2 text-left font-semibold text-gray-300">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id} className="border-b border-gray-800">
              <TableCell className="p-2 text-white">{question.title}</TableCell>
              <TableCell className="p-2">
                <a
                  href={question.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  View <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </TableCell>
              <TableCell className="p-2">
                <Select
                  value={question.category}
                  onValueChange={(value) => onCategoryChange(question.id, value)}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="hover:bg-gray-700">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}