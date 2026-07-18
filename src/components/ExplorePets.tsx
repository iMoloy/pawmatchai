"use client";

import React, { useState } from "react";
import { PetCard } from "@/components/PetCard";
import { placeholderPets, Pet } from "@/data/pets";

export const ExplorePets: React.FC = () => {
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("newest");

  // UI only – no real filtering/sorting logic
  const filteredPets = placeholderPets;

  return (
    <section className="py-12 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Explore Pets</h1>
          <p className="mt-2 text-gray-600">Find your new best friend</p>
        </header>

        {/* Search bar */}
        <div className="mb-6">
          <label htmlFor="search" className="sr-only">Search pets</label>
          <input
            id="search"
            type="search"
            placeholder="Search by name, breed, or keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto px-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center text-sm">
          <div>
            <label htmlFor="species" className="sr-only">Species</label>
            <select
              id="species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="sr-only">Age range</label>
            <select
              id="age"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Ages</option>
              <option value="puppy">Puppy / Kitten</option>
              <option value="young">Young (1‑3 yr)</option>
              <option value="adult">Adult (3‑7 yr)</option>
              <option value="senior">Senior (7+ yr)</option>
            </select>
          </div>
          <div>
            <label htmlFor="size" className="sr-only">Size</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label htmlFor="location" className="sr-only">Location</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">Any Location</option>
              <option value="nearby">Near Me</option>
              <option value="any">Anywhere</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">Newest</option>
              <option value="closest">Closest</option>
              <option value="youngest">Youngest</option>
            </select>
          </div>
        </div>

        {/* Pet grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPets.map((pet: Pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <nav className="mt-10 flex justify-center space-x-2" aria-label="Pagination">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-amber-600 border border-amber-600 rounded-lg">1</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
        </nav>
      </div>
    </section>
  );
};