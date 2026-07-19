"use client";

import React, { useState, use, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCard from "@/components/PetCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useChat } from "@/context/ChatContext";

export default function PetDetailsPage({ params }) {
  const resolvedParams = use(params);
  const petId = resolvedParams.id;
  const { startChatWithPet } = useChat();

  // 1. Fetch current pet details by ID
  const {
    data: petData,
    isLoading: isPetLoading,
    isError: isPetError,
    error: petError,
  } = useQuery({
    queryKey: ["pet", petId],
    queryFn: async () => {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";
      const response = await axios.get(`${apiBaseUrl}/api/pets/${petId}`);
      return response.data.pet;
    },
  });

  const pet = petData;

  // 2. Fetch related pets (same species, excluding current ID)
  const { data: relatedData } = useQuery({
    queryKey: ["relatedPets", pet?.species, pet?.id],
    queryFn: async () => {
      if (!pet?.species) return { pets: [] };
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";
      const response = await axios.get(`${apiBaseUrl}/api/pets`, {
        params: {
          species: pet.species,
          limit: 5, // Fetch slightly more to filter out the current one
        },
      });
      return response.data;
    },
    enabled: !!pet?.species, // Only run when pet species is known
  });

  const relatedPets = useMemo(() => {
    if (!relatedData?.pets || !pet) return [];
    return relatedData.pets.filter((p) => p.id !== pet.id).slice(0, 4);
  }, [relatedData, pet]);

  // Gallery state
  const [activeImage, setActiveImage] = useState("");

  // Adopt Now modal state
  const [isAdoptModalOpen, setIsAdoptModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantMessage, setApplicantMessage] = useState("");
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);

  // AI Assistant state
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiChatHistory, setAiChatHistory] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Set initial chat when pet loads
  React.useEffect(() => {
    if (pet) {
      setAiChatHistory([
        {
          role: "assistant",
          text: `Hi! I'm Paws, your AI adoption guide. Ask me anything about ${pet.name} (e.g., "Is they good with kids?", "What is their energy level?")!`,
        },
      ]);
      setActiveImage(pet.image);
    }
  }, [pet]);

  if (isPetLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50/50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <LoadingSpinner message="Fetching pet details..." />
        </main>
        <Footer />
      </div>
    );
  }

  if (isPetError || !pet) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm text-center max-w-md">
            <h1 className="text-2xl font-black text-slate-800 mb-2">
              Pet Not Found
            </h1>
            <p className="text-slate-650 mb-6">
              {petError?.response?.status === 404
                ? "The pet you are looking for has been adopted or doesn't exist."
                : "Unable to connect to the backend server. Please verify Express is running."}
            </p>
            <Link
              href="/explore"
              className="px-6 py-2.5 bg-teal-700 text-white font-semibold rounded-xl text-sm hover:bg-teal-800 transition-colors"
            >
              Back to Explore
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allImages =
    pet.images && pet.images.length > 0 ? pet.images : [pet.image];

  // Submit Adopt form
  const handleAdoptSubmit = (e) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setIsApplicationSubmitted(true);
  };

  // Submit AI message
  const handleAiMessageSubmit = (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    const userMsg = { role: "user", text: aiQuestion };
    setAiChatHistory((prev) => [...prev, userMsg]);
    const currentQuestion = aiQuestion.toLowerCase();
    setAiQuestion("");
    setIsAiLoading(true);

    // Mock AI response generation based on pet attributes
    setTimeout(() => {
      let reply = "";
      if (
        currentQuestion.includes("kid") ||
        currentQuestion.includes("child")
      ) {
        reply = pet.goodWithKids
          ? `Yes, ${pet.name} is exceptionally friendly and patient with children! They would make a wonderful family companion.`
          : `${pet.name} prefers a more mature or calm environment and is not recommended for households with young kids.`;
      } else if (
        currentQuestion.includes("pet") ||
        currentQuestion.includes("dog") ||
        currentQuestion.includes("cat")
      ) {
        reply = pet.goodWithPets
          ? `Indeed! ${pet.name} gets along very well with other animals. They would fit right in with your other pets.`
          : `${pet.name} prefers being the only pet in the household to get all the love and attention.`;
      } else if (
        currentQuestion.includes("vaccin") ||
        currentQuestion.includes("shot")
      ) {
        reply = pet.vaccinated
          ? `Yes, ${pet.name} is fully vaccinated, up-to-date on all shots, and ready for their new home.`
          : `${pet.name} has started their vaccination sequence and will need their booster shots soon.`;
      } else if (
        currentQuestion.includes("neuter") ||
        currentQuestion.includes("spay")
      ) {
        reply = pet.neutered
          ? `Yes, ${pet.name} has already been spayed/neutered.`
          : `${pet.name} is scheduled to be spayed/neutered shortly, which is fully covered by the adoption fee.`;
      } else if (
        currentQuestion.includes("fee") ||
        currentQuestion.includes("cost")
      ) {
        reply = `The adoption fee for ${pet.name} is $${pet.fee}. This fee covers their initial health checks, vaccinations, microchipping, and spay/neuter surgery.`;
      } else {
        reply = `${pet.name} is a beautiful ${pet.breed} with a personality described as: ${pet.temperament.join(", ")}. They weigh ${pet.weight} and are currently waiting for their forever home in ${pet.location}.`;
      }

      setAiChatHistory((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsAiLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-850 transition-colors group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Explore
          </Link>
        </div>

        {/* Pet Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Image Gallery & Core details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Panel */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 p-4 shadow-sm">
              <div className="aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={activeImage || pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-3.5 py-1 text-xs font-semibold rounded-full shadow-md bg-teal-700 text-white">
                    {pet.species}
                  </span>
                  <span
                    className={`px-3.5 py-1 text-xs font-semibold rounded-full shadow-md bg-white/90 backdrop-blur-sm ${
                      pet.sex === "Male" ? "text-blue-700" : "text-pink-700"
                    }`}
                  >
                    {pet.sex}
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === img || (!activeImage && index === 0)
                          ? "border-teal-700 scale-95 shadow-sm"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${pet.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Core Info Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                      {pet.breed}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-800">
                    {pet.name}
                  </h1>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block tracking-wider">
                    Adoption Fee
                  </span>
                  <span className="text-3xl font-black text-teal-700">
                    ${pet.fee}
                  </span>
                </div>
              </div>

              {/* Key Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Age
                  </span>
                  <span className="font-bold text-slate-800">{pet.age}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Size
                  </span>
                  <span className="font-bold text-slate-800 capitalize">
                    {pet.size}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Weight
                  </span>
                  <span className="font-bold text-slate-800">{pet.weight}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Gender
                  </span>
                  <span className="font-bold text-slate-800">{pet.sex}</span>
                </div>
              </div>

              {/* Health & Family Suitability Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${pet.vaccinated ? "bg-emerald-500" : "bg-amber-400"}`}
                  ></span>
                  <span className="text-slate-650 font-medium">
                    {pet.vaccinated ? "Vaccinated" : "Needs Vaccines"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${pet.neutered ? "bg-emerald-500" : "bg-amber-400"}`}
                  ></span>
                  <span className="text-slate-650 font-medium">
                    {pet.neutered ? "Neutered" : "Not Neutered"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${pet.goodWithKids ? "bg-emerald-500" : "bg-red-400"}`}
                  ></span>
                  <span className="text-slate-650 font-medium">
                    {pet.goodWithKids ? "Good with Kids" : "No Small Kids"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${pet.goodWithPets ? "bg-emerald-500" : "bg-red-400"}`}
                  ></span>
                  <span className="text-slate-650 font-medium">
                    {pet.goodWithPets ? "Good with Pets" : "Single Pet"}
                  </span>
                </div>
              </div>

              {/* Overview / Story Section */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xl font-bold text-slate-800">
                  About {pet.name}
                </h2>
                <p className="text-slate-650 leading-relaxed text-sm md:text-base">
                  {pet.description}
                </p>
              </div>

              {/* Temperament Tags */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xl font-bold text-slate-800">
                  Temperament
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pet.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3.5 py-1.5 bg-teal-55/60 text-teal-800 border border-teal-100 rounded-xl text-sm font-semibold shadow-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ask Paws AI Card — wired to global chat widget */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 rounded-2xl border border-teal-100 p-5 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-teal-900 text-sm md:text-base">
                      Ask Paws about {pet.name}
                    </h3>
                    <p className="text-teal-700 text-xs font-semibold">
                      AI Assistant powered by PawMatchAI
                    </p>
                  </div>
                </div>
                <p className="text-sm text-teal-800 mb-4">
                  Have questions about {pet.name}? Ask Paws anything about their
                  personality, adoption process, or how to prepare your home!
                </p>
                <button
                  onClick={() => startChatWithPet(pet)}
                  className="w-full py-3 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>🐾</span> Chat with Paws about {pet.name}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Adopt Sticky Box (4/12 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm text-center space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Available At
                </span>
                <span className="text-xl font-bold text-slate-800">
                  {pet.location}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Ready to welcome {pet.name} into your home? Start the secure
                  matching and adoption inquiry process today.
                </p>

                <button
                  onClick={() => setIsAdoptModalOpen(true)}
                  className="w-full py-4 bg-teal-700 text-white font-bold rounded-2xl shadow-md hover:bg-teal-850 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer text-sm tracking-wider uppercase"
                >
                  Adopt {pet.name} Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pets Section */}
        {relatedPets.length > 0 && (
          <section className="border-t border-slate-200/60 pt-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800">
                  Similar Pets Nearby
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Explore other adorable {pet.species.toLowerCase()}s looking
                  for a family.
                </p>
              </div>
              <Link
                href="/explore"
                className="text-sm font-bold text-teal-700 hover:text-teal-850 transition-colors"
              >
                View All Pets &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPets.map((p) => (
                <PetCard key={p.id} pet={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Adoption Inquiry Modal */}
      {isAdoptModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-teal-700 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Adopt {pet.name}</h2>
                <p className="text-teal-150 text-xs">
                  Start your adoption application
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAdoptModalOpen(false);
                  setIsApplicationSubmitted(false);
                }}
                className="text-white hover:text-teal-150 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {isApplicationSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-655 text-sm">
                    Thank you for applying to adopt {pet.name}! Our shelter
                    coordinators will review your matching criteria and contact
                    you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsAdoptModalOpen(false);
                      setIsApplicationSubmitted(false);
                      setApplicantName("");
                      setApplicantEmail("");
                      setApplicantMessage("");
                    }}
                    className="px-6 py-2.5 bg-teal-700 text-white font-semibold rounded-xl text-sm hover:bg-teal-850 transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdoptSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label
                      htmlFor="modal-name"
                      className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Your Full Name
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="modal-email"
                      className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label
                      htmlFor="modal-msg"
                      className="text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Why are you a good match?
                    </label>
                    <textarea
                      id="modal-msg"
                      rows={4}
                      value={applicantMessage}
                      onChange={(e) => setApplicantMessage(e.target.value)}
                      placeholder="Share a bit about your home environment, experience, and why you want to adopt..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Action row */}
                  <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsAdoptModalOpen(false)}
                      className="px-4 py-2 text-slate-500 font-semibold hover:text-slate-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-teal-700 text-white font-bold rounded-xl text-sm hover:bg-teal-850 transition-colors shadow-md cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
