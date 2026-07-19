"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PetCard from "./PetCard";
import LoadingSpinner from "./LoadingSpinner";

// Mock data to fall back on if backend is unreachable
const fallbackPets = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "3 years",
    location: "New York, NY",
    fee: 150,
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
    species: "Dog",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Persian Cat",
    age: "2 years",
    location: "Los Angeles, CA",
    fee: 100,
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
    species: "Cat",
  },
  {
    id: 3,
    name: "Max",
    breed: "Beagle",
    age: "4 years",
    location: "Chicago, IL",
    fee: 120,
    image:
      "https://images.unsplash.com/photo-1537151608804-ea2d15a4eb35?auto=format&fit=crop&q=80&w=800",
    species: "Dog",
  },
  {
    id: 4,
    name: "Bella",
    breed: "Siamese Cat",
    age: "1 year",
    location: "Miami, FL",
    fee: 90,
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&q=80&w=800",
    species: "Cat",
  },
];

export default function FeaturedPets() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredPets"],
    queryFn: async () => {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";
      const response = await axios.get(`${apiBaseUrl}/api/pets?limit=8`);
      return response.data;
    },
    retry: 1, // Only retry once so it falls back quickly if backend is down
  });

  const pets = data?.data || fallbackPets;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Pets
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet some of our adorable pets waiting for their forever homes
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner message="Fetching featured pets..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet: any) => (
              <PetCard key={pet.id || pet._id} pet={pet} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/explore"
            className="inline-flex items-center px-8 py-3 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition-colors shadow-sm"
          >
            View All Pets →
          </Link>
        </div>
      </div>
    </section>
  );
}
