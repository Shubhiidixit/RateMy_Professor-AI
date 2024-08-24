"use client";

import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import {
  PencilAltIcon,
  CheckCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

type ProfessorRating = {
  name: string;
  subject: string;
  rating: number;
  explanation: string;
};

export default function Home() {
  const [professorName, setProfessorName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showListButton, setShowListButton] = useState<boolean>(false);
  const [ratingCount, setRatingCount] = useState<number>(0);

  useEffect(() => {
    const storedRatings: ProfessorRating[] = JSON.parse(
      localStorage.getItem("professorRatings") || "[]"
    );
    setRatingCount(storedRatings.length);
  }, []);

  const handleRateProfessor = async () => {
    if (
      rating === 0 ||
      professorName.trim() === "" ||
      subject.trim() === "" ||
      explanation.trim() === ""
    ) {
      setError("Please fill in all fields and select a rating.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const currentRatings: ProfessorRating[] = JSON.parse(
        localStorage.getItem("professorRatings") || "[]"
      );
      const newRating: ProfessorRating = {
        name: professorName,
        subject,
        rating,
        explanation,
      };
      localStorage.setItem(
        "professorRatings",
        JSON.stringify([...currentRatings, newRating])
      );

      setProfessorName("");
      setSubject("");
      setExplanation("");
      setRating(0);
      setRatingCount(ratingCount + 1);
      setShowListButton(true);
    } catch (err) {
      setError("Failed to submit rating.");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-start py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-5xl text-center mb-12">
        <h1 className="text-5xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2">
          Rate My <span className="text-accent2">Professor</span>
        </h1>
      </header>

      {/* Why Rate My Professor Section */}
      <section className="w-full max-w-4xl text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-white mb-6">
          Why Use Our Platform?
        </h2>
        <p className="text-xl text-gray-300">
          <Typewriter
            words={[
              "Get real insights into professors.",
              "Make informed course selections.",
              "Share your academic experiences.",
            ]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </p>
      </section>

      {/* Rating Box */}
      <main className="w-full max-w-md bg-cardBg p-8 rounded-lg shadow-lg mb-16">
        <h3 className="text-2xl font-poppins font-semibold text-white mb-6">
          Rate a Professor
        </h3>
        <input
          type="text"
          placeholder="Enter Professor's Name"
          value={professorName}
          onChange={(e) => setProfessorName(e.target.value)}
          className="p-3 border border-gray-600 rounded w-full mb-4 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="p-3 border border-gray-600 rounded w-full mb-4 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <textarea
          placeholder="Why this rating?"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="p-3 border border-gray-600 rounded w-full mb-4 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
          rows={3}
        />
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-10 w-10 cursor-pointer transition-colors duration-200 ${star <= rating ? "text-yellow-400" : "text-gray-500"
                }`}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
        <button
          onClick={handleRateProfessor}
          className="w-full py-3 bg-accent text-white rounded hover:bg-accent2 transition duration-300 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
        {error && (
          <p className="mt-4 text-red-500 font-medium text-center">{error}</p>
        )}
        {showListButton && (
          <Link href="/professors">
            <button className="mt-6 w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              View Professor List
            </button>
          </Link>
        )}
      </main>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-poppins font-bold text-white text-center mb-10">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Card 1 */}
          <div className="bg-cardBg p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <PencilAltIcon className="h-16 w-16 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Provide a Rating
            </h3>
            <p className="text-gray-400">
              Share your experience by rating your professors based on their
              teaching effectiveness.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-cardBg p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <CheckCircleIcon className="h-16 w-16 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Submit Your Review
            </h3>
            <p className="text-gray-400">
              Help other students make informed decisions by submitting your
              honest reviews.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-cardBg p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <SearchIcon className="h-16 w-16 text-accent mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Browse Ratings
            </h3>
            <p className="text-gray-400">
              Explore ratings and reviews to choose the best professors for your
              courses.
            </p>
          </div>
        </div>
      </section>

      {/* Rating Counter Section */}
      <section className="w-full max-w-4xl text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-white mb-6">
          Total Ratings Submitted
        </h2>
        <div className="text-5xl font-poppins font-extrabold text-accent">
          {ratingCount}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-poppins font-bold text-white text-center mb-10">
          What Students Are Saying
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="bg-cardBg p-6 rounded-lg shadow-md flex flex-col text-center">
            <p className="text-gray-400">
              "This platform helped me pick the best professors for my courses.
              The ratings were spot-on!"
            </p>
            <div className="mt-4 text-accent font-bold">- Student A</div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-cardBg p-6 rounded-lg shadow-md flex flex-col text-center">
            <p className="text-gray-400">
              "I appreciate how easy it is to submit my ratings. The interface
              is clean and straightforward."
            </p>
            <div className="mt-4 text-accent font-bold">- Student B</div>
          </div>
        </div>
      </section>
    </div>
  );
}
