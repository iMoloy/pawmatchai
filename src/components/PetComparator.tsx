"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface PetForComparison {
  id: string | number;
  name: string;
  breed: string;
  species?: string;
  age: string | number;
  size?: string;
  energyLevel?: string;
  apartmentFriendly?: boolean;
  goodWithKids?: boolean;
  groomingNeed?: string;
  image?: string;
  fee?: number | string;
}

interface PetComparatorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPets: PetForComparison[];
  onRemovePet: (id: string | number) => void;
}

export default function PetComparator({
  isOpen,
  onClose,
  selectedPets,
  onRemovePet,
}: PetComparatorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚖️</span>
              <h2 className="text-xl font-bold">Side-by-Side Pet Comparator</h2>
            </div>
            <p className="text-xs text-teal-100 mt-1">
              Compare traits, energy, and living compatibility before adopting
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {selectedPets.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-4xl">🐾</span>
              <h3 className="text-lg font-semibold text-slate-800 mt-3">No pets selected for comparison</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
                Click "Compare" on pet cards in Explore or Pets page to add up to 3 pets here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between relative shadow-sm hover:shadow-md transition"
                >
                  <button
                    onClick={() => onRemovePet(pet.id)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 bg-red-100 hover:bg-red-200 text-red-600 rounded-full text-xs font-bold transition flex items-center justify-center"
                    title="Remove from comparison"
                  >
                    ✕
                  </button>

                  <div>
                    {/* Pet Image */}
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4 bg-slate-200">
                      {pet.image ? (
                        <Image
                          src={pet.image}
                          alt={pet.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl">🐶</div>
                      )}
                    </div>

                    {/* Pet Name & Breed */}
                    <h3 className="text-xl font-bold text-slate-900">{pet.name}</h3>
                    <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-4">
                      {pet.breed}
                    </p>

                    {/* Metrics Breakdown */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Age:</span>
                        <span className="font-medium text-slate-800">{pet.age} yrs</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Size:</span>
                        <span className="font-medium text-slate-800">{pet.size || "Medium"}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Energy Level:</span>
                        <span className="font-medium text-amber-600">{pet.energyLevel || "Moderate"}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Apartment Friendly:</span>
                        <span className={`font-semibold ${pet.apartmentFriendly !== false ? "text-emerald-600" : "text-amber-600"}`}>
                          {pet.apartmentFriendly !== false ? "✓ Highly Suitable" : "⚡ Needs Space"}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-slate-500">Kid Friendly:</span>
                        <span className="font-semibold text-emerald-600">
                          {pet.goodWithKids !== false ? "✓ Yes" : "⚠️ Supervised"}
                        </span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-slate-500">Adoption Fee:</span>
                        <span className="font-bold text-teal-700">${pet.fee || 120}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Comparing {selectedPets.length} of 3 maximum pets</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition"
          >
            Close Comparator
          </button>
        </div>
      </div>
    </div>
  );
}
