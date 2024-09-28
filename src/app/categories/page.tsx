'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoriesPage() {
    const router = useRouter();

    const categories = [
        "Array", "String", "Hash Table", "Dynamic Programming", "Math",
        "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database",
        "Breadth-First Search", "Tree", "Matrix", "Two Pointers", "Bit Manipulation"
    ];

    const handleCategorySelect = (category: string) => {
        router.push(`/questions/${encodeURIComponent(category)}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-10">
                    Explore Categories
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <h2 className="text-xl font-semibold mb-2">{category}</h2>
                            <p className="text-gray-400">Explore questions</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
