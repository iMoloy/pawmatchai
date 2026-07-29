"use client";

import React, { useState } from "react";

interface PetBudgetEstimatorProps {
  species?: string;
  size?: string;
  weight?: string;
}

export default function PetBudgetEstimator({
  species = "Dog",
  size = "medium",
  weight = "15 kg",
}: PetBudgetEstimatorProps) {
  const [foodQuality, setFoodQuality] = useState<"standard" | "premium" | "organic">("premium");
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [groomingFrequency, setGroomingFrequency] = useState<"occasional" | "monthly">("monthly");

  // Base costs calculated based on species & size
  const isDog = species.toLowerCase().includes("dog");
  const isCat = species.toLowerCase().includes("cat");

  const sizeMultiplier = size.toLowerCase() === "large" ? 1.5 : size.toLowerCase() === "small" ? 0.7 : 1.0;

  const foodBase = (isDog ? 45 : isCat ? 35 : 20) * sizeMultiplier;
  const foodCost = Math.round(
    foodQuality === "organic" ? foodBase * 1.6 : foodQuality === "premium" ? foodBase * 1.25 : foodBase
  );

  const insuranceCost = includeInsurance ? (isDog ? 38 : isCat ? 25 : 15) : 0;
  const groomingCost = (groomingFrequency === "monthly" ? (isDog ? 40 : 25) : 15) * sizeMultiplier;
  const toysAndMisc = Math.round(25 * sizeMultiplier);

  const totalMonthlyCost = foodCost + insuranceCost + Math.round(groomingCost) + toysAndMisc;
  const yearlyCost = totalMonthlyCost * 12;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700/60 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-teal-500/30">
            📊 AI Financial Estimator
          </span>
          <h3 className="text-xl font-black">Monthly Pet Budget Breakdown</h3>
        </div>
        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-black text-teal-400">
            ${totalMonthlyCost}
          </span>
          <span className="text-xs text-slate-400 font-medium block">/ month est.</span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs">
        {/* Food Quality Selector */}
        <div>
          <label className="font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
            Diet / Food Quality
          </label>
          <select
            value={foodQuality}
            onChange={(e) => setFoodQuality(e.target.value as any)}
            className="w-full bg-slate-800 border border-slate-700 text-white p-2 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
          >
            <option value="standard">Standard Dry Food</option>
            <option value="premium">Premium Grain-Free</option>
            <option value="organic">Fresh Organic / Raw</option>
          </select>
        </div>

        {/* Health Insurance Toggle */}
        <div>
          <label className="font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
            Pet Health Insurance
          </label>
          <select
            value={includeInsurance ? "yes" : "no"}
            onChange={(e) => setIncludeInsurance(e.target.value === "yes")}
            className="w-full bg-slate-800 border border-slate-700 text-white p-2 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
          >
            <option value="yes">Included (~${insuranceCost}/mo)</option>
            <option value="no">Not Included ($0)</option>
          </select>
        </div>

        {/* Grooming Frequency */}
        <div>
          <label className="font-bold text-slate-300 block mb-1.5 uppercase tracking-wider">
            Grooming Care
          </label>
          <select
            value={groomingFrequency}
            onChange={(e) => setGroomingFrequency(e.target.value as any)}
            className="w-full bg-slate-800 border border-slate-700 text-white p-2 rounded-xl focus:ring-2 focus:ring-teal-400 outline-none"
          >
            <option value="monthly">Monthly Professional</option>
            <option value="occasional">At Home / Basic</option>
          </select>
        </div>
      </div>

      {/* Cost Breakdown Progress Bars */}
      <div className="space-y-3 pt-2 text-xs font-medium">
        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>🍲 Food, Treats & Nutrition</span>
            <span className="font-bold text-white">${foodCost}/mo</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-2 rounded-full"
              style={{ width: `${Math.min(100, (foodCost / totalMonthlyCost) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>🏥 Routine Vet & Insurance</span>
            <span className="font-bold text-white">${insuranceCost}/mo</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-2 rounded-full"
              style={{ width: `${Math.min(100, (insuranceCost / totalMonthlyCost) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>✂️ Grooming & Bath Care</span>
            <span className="font-bold text-white">${Math.round(groomingCost)}/mo</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-400 h-2 rounded-full"
              style={{ width: `${Math.min(100, (groomingCost / totalMonthlyCost) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1">
            <span>🧸 Toys, Leashes & Emergency Fund</span>
            <span className="font-bold text-white">${toysAndMisc}/mo</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-2 rounded-full"
              style={{ width: `${Math.min(100, (toysAndMisc / totalMonthlyCost) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
        <span>Estimated Annual Care Cost:</span>
        <span className="font-bold text-teal-300 text-sm">${yearlyCost.toLocaleString()} / year</span>
      </div>
    </div>
  );
}
