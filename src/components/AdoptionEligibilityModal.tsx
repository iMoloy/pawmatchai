"use client";

import React, { useState } from "react";

interface AssessmentQuestions {
  homeOwnership: string;
  dailyAloneHours: string;
  annualBudget: string;
  previousExperience: string;
  veterinarianContact: string;
}

export default function AdoptionEligibilityModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"quiz" | "result">("quiz");
  const [answers, setAnswers] = useState<AssessmentQuestions>({
    homeOwnership: "Own",
    dailyAloneHours: "2-4",
    annualBudget: "1000-2000",
    previousExperience: "Yes",
    veterinarianContact: "Yes",
  });
  const [score, setScore] = useState<number>(0);

  if (!isOpen) return null;

  const calculateScore = () => {
    let pts = 50;
    if (answers.homeOwnership === "Own") pts += 15;
    if (answers.dailyAloneHours === "0-2" || answers.dailyAloneHours === "2-4") pts += 15;
    if (answers.annualBudget === "1000-2000" || answers.annualBudget === "2000+") pts += 10;
    if (answers.previousExperience === "Yes") pts += 5;
    if (answers.veterinarianContact === "Yes") pts += 5;

    setScore(pts);
    setStep("result");
  };

  const resetForm = () => {
    setStep("quiz");
    setScore(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <h2 className="text-xl font-bold">Adoption Eligibility Simulator</h2>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Check your readiness & get an instant readiness badge
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "quiz" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  1. Do you own or rent your living space?
                </label>
                <select
                  value={answers.homeOwnership}
                  onChange={(e) => setAnswers({ ...answers, homeOwnership: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="Own">Own Home / Apartment (Pet Friendly)</option>
                  <option value="RentPermitted">Rent (Landlord Approved)</option>
                  <option value="RentPending">Rent (Approval Pending)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  2. Average hours pet will spend alone daily:
                </label>
                <select
                  value={answers.dailyAloneHours}
                  onChange={(e) => setAnswers({ ...answers, dailyAloneHours: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="0-2">0 - 2 hours (Work from home / Always someone home)</option>
                  <option value="2-4">2 - 4 hours</option>
                  <option value="4-8">4 - 8 hours</option>
                  <option value="8+">8+ hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  3. Estimated annual pet budget (Food, vet, toys):
                </label>
                <select
                  value={answers.annualBudget}
                  onChange={(e) => setAnswers({ ...answers, annualBudget: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="1000-2000">$1,000 - $2,000 / year</option>
                  <option value="2000+">$2,000+ / year</option>
                  <option value="500-1000">Under $1,000 / year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  4. Have you previously owned a pet?
                </label>
                <select
                  value={answers.previousExperience}
                  onChange={(e) => setAnswers({ ...answers, previousExperience: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                >
                  <option value="Yes">Yes, experienced pet owner</option>
                  <option value="No">No, first-time pet parent</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={calculateScore}
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition shadow-md hover:shadow-lg"
                >
                  Calculate Adoption Readiness Score 🚀
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 text-3xl font-extrabold shadow-inner border-4 border-emerald-300">
                {score}%
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {score >= 80 ? "🎉 High Adoption Readiness!" : "👍 Moderate Readiness"}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Your home profile matches top pet shelter requirements. Your profile badge is active for online applications!
                </p>
              </div>

              {/* Certificate Preview Card */}
              <div className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-left shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                      Verified Badge
                    </span>
                    <h4 className="font-bold text-slate-800 text-base mt-0.5">
                      PawMatch Pre-Approved Adopter
                    </h4>
                  </div>
                  <span className="text-2xl">🏅</span>
                </div>
                <div className="mt-3 text-xs text-slate-600 space-y-1">
                  <p>• Readiness Score: <strong className="text-emerald-700">{score}%</strong></p>
                  <p>• Home Status: <strong className="text-slate-800">{answers.homeOwnership}</strong></p>
                  <p>• Daily Care Availability: <strong className="text-slate-800">{answers.dailyAloneHours} hrs alone</strong></p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={resetForm}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition"
                >
                  Re-Calculate
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
