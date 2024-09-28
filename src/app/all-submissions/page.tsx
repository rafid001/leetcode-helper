'use client';

import React, { useEffect, useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MultiSelect } from '@/components/Multiselect';
import { ExternalLink, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

interface QuestionItem {
  id: string;
  title: string;
  link: string;
  title_slug: string;
  categories: string[];
  status: number;
}

interface UpdatedJson {
  title_slug: string;
  question_title: string;
  categories: string[];
  question_id: string;
}

const categories = [
  "Array", "String", "Hash Table", "Dynamic Programming", "Math",
  "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database",
  "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Bit Manipulation"
];

export default function AllSubmissionsPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [updatedJson, setUpdatedJson] = useState<UpdatedJson[]>([]);

  const fetchQuestions = async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * 20;
      const response = await axios.get('/api/all-entries', {
        params: { offset, limit: 20, lastKey: lastKey || '' }
      });

      setQuestions(response.data.submissions_dump);
      setHasNext(response.data.has_next);
      setLastKey(response.data.has_next ? response.data.last_key : null);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(1);
  }, []);

  const handleCategoryChange = (title_slug: string, questionName: string, questionId: string, selectedCategories: string[]) => {
    setUpdatedJson((prev) => {
      const existingIndex = prev.findIndex((item) => item.question_id === questionId);
      if (existingIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          categories: selectedCategories,
        };
        return updatedItems;
      } else {
        return [...prev, {
          title_slug,
          question_title: questionName,
          question_id: questionId,
          categories: selectedCategories
        }];
      }
    });

    setQuestions((prevQuestions) => 
      prevQuestions.map((q) => 
        q.id === questionId ? { ...q, categories: selectedCategories } : q
      )
    );

    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.post('/api/create', updatedJson, {
        headers: { 'Content-Type': 'application/json' },
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving category changes:', error);
    }
  };

  return (
    <>
    <TopBar />
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-100">All Submissions</h1>
          <button
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>

        <div className="rounded-md border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Question</TableHead>
                <TableHead className="w-[150px]">Link</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  <TableRow className="animate-pulse">
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="h-4 bg-gray-700 rounded w-16"></div>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="h-4 bg-gray-700 rounded w-32"></div>
                    </TableCell>
                  </TableRow>
                </>
              ) : questions.length > 0 ? (
                questions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="text-gray-100">{question.title}</TableCell>
                    <TableCell>
                      <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View
                        <ExternalLink className="ml-1 inline-block h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell>
                      {question.status === 10 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-600 text-white">
                          <CheckCircle className="mr-1 h-3 w-3 " /> Accepted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-600 text-white  ">
                          <XCircle className="mr-1 h-3 w-3" /> Not Accepted
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {question.status === 10 ? (
                        <MultiSelect
                          options={categories}
                          selected={question.categories}
                          onChange={(selectedCategories) => handleCategoryChange(question.title_slug, question.title, question.id, selectedCategories)}
                        />
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-100">
                    No submissions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex justify-between">
          {}
          <button
            onClick={() => currentPage > 1 && fetchQuestions(currentPage - 1)}
            className="px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600 transition"
          >
            <ChevronLeft className="inline-block h-5 w-5 mr-2" /> Previous
          </button>
          <button
            onClick={() => hasNext && fetchQuestions(currentPage + 1)}
            className="px-4 py-2 bg-gray-700 text-gray-100 rounded-md hover:bg-gray-600 transition"
          >
            Next <ChevronRight className="inline-block h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
