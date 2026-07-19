"use client";

import React, { useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCard from "@/components/PetCard";

// The quiz steps definition
const QUIZ_STEPS = [
  {
    id: "livingSpace",
    question: "What best describes your living space?",
    options: [
      { value: "Apartment", label: "Apartment or Condo", icon: "🏢" },
      { value: "HouseNoYard", label: "House without a yard", icon: "🏠" },
      { value: "HouseYard", label: "House with a fenced yard", icon: "🏡" },
      { value: "Farm", label: "Farm or acreage", icon: "🌾" },
    ],
  },
  {
    id: "activityLevel",
    question: "How active is your household?",
    options: [
      { value: "Low", label: "Relaxed & quiet (Couch potatoes)", icon: "🛋️" },
      {
        value: "Medium",
        label: "Moderate (Daily walks, playing inside)",
        icon: "🚶",
      },
      {
        value: "High",
        label: "Very Active (Hiking, running daily)",
        icon: "🏃",
      },
    ],
  },
  {
    id: "familyPets",
    question: "Who else lives with you?",
    options: [
      { value: "None", label: "Just adults", icon: "👥" },
      { value: "Kids", label: "Children under 12", icon: "👶" },
      { value: "Pets", label: "Other pets (Dogs/Cats)", icon: "🐕" },
      { value: "Both", label: "Both kids and pets", icon: "👨‍👩‍👧‍👦" },
    ],
  },
  {
    id: "experience",
    question: "What is your pet ownership experience?",
    options: [
      { value: "FirstTime", label: "First-time owner", icon: "🌱" },
      { value: "Some", label: "Had pets growing up", icon: "🐾" },
      { value: "Experienced", label: "Experienced owner/Trainer", icon: "🏆" },
    ],
  },
];

export default function AIMatchPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  // Local refine filters for results page
  const [filters, setFilters] = useState({ species: "All", size: "All" });

  const handleSelectOption = (stepId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));

    // Auto-advance if not the last step
    if (currentStep < QUIZ_STEPS.length - 1) {
      setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsScanning(true);
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";
      const res = await axios.post(`${apiBaseUrl}/api/ai/recommend`, {
        answers,
      });
      setResults(res.data.matches);
    } catch (error) {
      console.error("Failed to fetch AI matches", error);
      // Fallback if backend isn't ready
      alert("Failed to connect to AI engine. Please check backend.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleFeedback = async (petId: string | number, feedbackType: "like" | "dislike") => {
    try {
      // Optimistically hide if disliked or just show success
      if (feedbackType === "dislike") {
        setResults((prev) => (prev ? prev.filter((p) => p.id !== petId) : prev));
      }

      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";
      const res = await axios.post(`${apiBaseUrl}/api/ai/feedback`, {
        petId,
        feedback: feedbackType,
        currentResults: results, // send current state to re-rank
      });

      if (res.data && res.data.reRankedMatches) {
        setResults(res.data.reRankedMatches);
      }
    } catch (error) {
      console.error("Failed to submit feedback", error);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
    setFilters({ species: "All", size: "All" });
  };

  // View: Scanning Animation
  if (isScanning) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-white justify-center items-center p-4">
        <div className="relative w-32 h-32 mb-8">
          <div className="absolute inset-0 border-4 border-teal-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-teal-400 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            🤖
          </div>
        </div>
        <h2 className="text-2xl font-black mb-2">Paws is thinking...</h2>
        <p className="text-slate-400 text-center max-w-sm">
          Analyzing your lifestyle against 500+ pets using our neural matching
          engine.
        </p>
      </div>
    );
  }

  // View: AI Results
  if (results) {
    const filteredResults = results.filter((pet) => {
      if (filters.species !== "All" && pet.species !== filters.species)
        return false;
      if (filters.size !== "All" && pet.size !== filters.size) return false;
      return true;
    });

    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                AI Match Complete
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Your Perfect Matches
              </h1>
              <p className="text-slate-500 mt-2">
                Ranked by compatibility based on your lifestyle.
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors underline"
            >
              Retake Quiz
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Local Filters Panel */}
            <div className="w-full lg:w-64 shrink-0">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  Refine Results
                </h3>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Species
                    </label>
                    <select
                      value={filters.species}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          species: e.target.value,
                        }))
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="All">All Species</option>
                      <option value="Dog">Dogs</option>
                      <option value="Cat">Cats</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Size
                    </label>
                    <select
                      value={filters.size}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          size: e.target.value,
                        }))
                      }
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    >
                      <option value="All">Any Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="flex-1">
              {filteredResults.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                  <p className="text-slate-500">
                    No matches found with current filters.
                  </p>
                  <button
                    onClick={() => setFilters({ species: "All", size: "All" })}
                    className="mt-4 text-teal-600 font-bold hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredResults.map((pet, index) => (
                    <div
                      key={pet.id}
                      className="relative animate-in slide-in-from-bottom-4 fade-in duration-500"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      {index === 0 && (
                        <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-lg transform rotate-3">
                          #1 Best Match
                        </div>
                      )}
                      <PetCard
                        pet={pet}
                        aiReason={pet.aiReason}
                        onLike={() => handleFeedback(pet.id, "like")}
                        onDislike={() => handleFeedback(pet.id, "dislike")}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // View: Quiz Steps
  const step = QUIZ_STEPS[currentStep];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2">
            <div
              className="bg-teal-500 h-2 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / QUIZ_STEPS.length) * 100}%` }}
            ></div>
          </div>

          <div className="p-8 sm:p-12 text-center">
            <span className="text-teal-600 font-bold text-sm tracking-wider uppercase mb-4 block">
              Step {currentStep + 1} of {QUIZ_STEPS.length}
            </span>
            <h2 className="text-3xl font-black text-slate-800 mb-10">
              {step.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step.options.map((opt) => {
                const isSelected = answers[step.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(step.id, opt.value)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 group flex items-center gap-4
                      ${
                        isSelected
                          ? "border-teal-500 bg-teal-50/50 shadow-md ring-4 ring-teal-500/10"
                          : "border-slate-100 bg-white hover:border-teal-200 hover:bg-slate-50"
                      }`}
                  >
                    <div
                      className={`text-3xl transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}
                    >
                      {opt.icon}
                    </div>
                    <span
                      className={`font-bold ${isSelected ? "text-teal-800" : "text-slate-700"}`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 flex justify-between items-center">
              {currentStep > 0 ? (
                <button
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-6 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep === QUIZ_STEPS.length - 1 && answers[step.id] ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg animate-in fade-in zoom-in duration-300 flex items-center gap-2"
                >
                  Find My Match <span>✨</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
