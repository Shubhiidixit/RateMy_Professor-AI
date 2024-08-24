"use client";

import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";

type ProfessorRating = {
    name: string;
    subject: string;
    rating: number;
    explanation: string;
};

export default function Professors() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [professorRatings, setProfessorRatings] = useState<ProfessorRating[]>([]);

    useEffect(() => {
        const storedRatings: ProfessorRating[] = JSON.parse(
            localStorage.getItem("professorRatings") || "[]"
        );
        setProfessorRatings(storedRatings);
    }, []);

    const handleDelete = (name: string) => {
        const updatedRatings = professorRatings.filter(
            (prof) => prof.name !== name
        );
        setProfessorRatings(updatedRatings);
        localStorage.setItem("professorRatings", JSON.stringify(updatedRatings));
    };

    const filteredProfessors = professorRatings.filter((prof) =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
            <header className="w-full p-6 bg-secondary text-center">
                <h1 className="text-4xl font-poppins font-bold text-white">
                    Professors List
                </h1>
            </header>

            <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
                <div className="w-full max-w-md bg-cardBg p-8 rounded-lg shadow-lg">
                    <input
                        type="text"
                        placeholder="Search Professors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-3 border border-gray-600 rounded w-full mb-4 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <ul>
                        {filteredProfessors.length > 0 ? (
                            filteredProfessors.map((professor, index) => (
                                <li key={index} className="mb-4 bg-secondary p-4 rounded-lg shadow-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <div>
                                            <p className="text-lg font-semibold text-white">
                                                {professor.name}
                                            </p>
                                            <p className="text-sm text-gray-400">{professor.subject}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(professor.name)}
                                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                className={`h-6 w-6 ${star <= professor.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-400"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        {professor.explanation}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No professors found.</p>
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
}
