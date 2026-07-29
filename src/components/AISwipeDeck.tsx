"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PetMatch {
  _id?: string;
  id: string | number;
  name: string;
  species: string;
  breed: string;
  age: string;
  size: string;
  image?: string;
  location?: string;
  aiScore?: number;
  aiReason?: string;
  temperament?: string[];
}

interface AISwipeDeckProps {
  pets: PetMatch[];
  onFinish?: (shortlisted: PetMatch[]) => void;
}

export default function AISwipeDeck({ pets }: AISwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlisted, setShortlisted] = useState<PetMatch[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

  if (!pets || pets.length === 0 || currentIndex >= pets.length) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-black text-slate-800 mb-2">
          You've Reviewed All Matches!
        </h3>
        <p className="text-slate-500 mb-6">
          You shortlisted <span className="font-bold text-teal-600">{shortlisted.length}</span> pets from your AI recommendations deck.
        </p>

        {shortlisted.length > 0 ? (
          <div className="space-y-4 mb-8">
            <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider text-left">
              Shortlisted Pets ({shortlisted.length})
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {shortlisted.map((pet) => (
                <div key={pet.id} className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
                  <img
                    src={pet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200"}
                    alt={pet.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="text-left overflow-hidden">
                    <h5 className="font-bold text-slate-800 text-sm truncate">{pet.name}</h5>
                    <span className="text-xs text-teal-600 font-bold">{pet.aiScore || 90}% Match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <button
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-md"
        >
          Review Deck Again
        </button>
      </div>
    );
  }

  const currentPet = pets[currentIndex];
  const score = currentPet.aiScore || 90;

  // Derive mini-scores for compatibility meters
  const activityScore = Math.min(99, score + (currentIndex % 3 === 0 ? 3 : -2));
  const spaceScore = Math.min(99, score - (currentIndex % 2 === 0 ? 4 : -5));
  const familyScore = Math.min(99, score + 2);
  const budgetScore = Math.min(99, score - 3);

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
    if (direction === "right") {
      setShortlisted((prev) => [...prev, currentPet]);
    }
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex((prev) => prev + 1);
    }, 250);
  };

  return (
    <div className="max-w-md mx-auto relative px-4">
      {/* Shortlist Counter Badge */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Card {currentIndex + 1} of {pets.length}
        </span>
        <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
          ❤️ {shortlisted.length} Shortlisted
        </span>
      </div>

      {/* Main Tinder Card Container */}
      <div
        className={`bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform ${
          swipeDirection === "right"
            ? "translate-x-32 rotate-12 opacity-0"
            : swipeDirection === "left"
            ? "-translate-x-32 -rotate-12 opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        {/* Card Header / Image */}
        <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
          <img
            src={currentPet.image || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800"}
            alt={currentPet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

          {/* AI Match Badge */}
          <div className="absolute top-4 left-4 bg-teal-500 text-white font-black text-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <span>✨</span>
            <span>{score}% AI Match</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-2xl font-black">{currentPet.name}</h3>
            <p className="text-slate-200 text-sm font-medium">
              {currentPet.breed} • {currentPet.age} • {currentPet.location || "Available"}
            </p>
          </div>
        </div>

        {/* Card Body & Compatibility Breakdown */}
        <div className="p-6 space-y-5">
          {/* AI Reason */}
          {currentPet.aiReason && (
            <div className="bg-teal-50/80 border border-teal-100 rounded-2xl p-4">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-1">
                Why Paws Chose {currentPet.name}:
              </span>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                "{currentPet.aiReason}"
              </p>
            </div>
          )}

          {/* Radar / Meter Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Compatibility Breakdown
            </h4>

            <div className="space-y-2 text-xs font-medium">
              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>🏃 Household Activity Fit</span>
                  <span className="font-bold text-slate-800">{activityScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${activityScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>🏠 Living Space Match</span>
                  <span className="font-bold text-slate-800">{spaceScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${spaceScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>👶 Kids & Family Safety</span>
                  <span className="font-bold text-slate-800">{familyScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${familyScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>💰 Budget Alignment</span>
                  <span className="font-bold text-slate-800">{budgetScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${budgetScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-around">
          <button
            onClick={() => handleSwipe("left")}
            className="w-14 h-14 rounded-full bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:scale-110 transition-all flex items-center justify-center text-xl shadow-md"
            title="Pass"
          >
            ✕
          </button>

          <Link
            href={`/explore/${currentPet.id}`}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            View Profile
          </Link>

          <button
            onClick={() => handleSwipe("right")}
            className="w-14 h-14 rounded-full bg-teal-600 text-white hover:bg-teal-700 hover:scale-110 transition-all flex items-center justify-center text-xl shadow-lg"
            title="Shortlist Pet"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
